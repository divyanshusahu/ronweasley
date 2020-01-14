from flask import Blueprint, jsonify, request
import boto3
import os
import uuid
import hashlib
from datetime import datetime, timezone
import validators

new_fanart = Blueprint("new_fanart", __name__, url_prefix="/new_fanart")

allowed_types = [
    "ron_weasley_fanart",
    "romione_fanart",
]

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
    s3 = boto3.client(
        "s3", region_name="localhost", endpoint_url="http://localhost:4572"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])
    s3 = boto3.client("s3", region_name=os.environ["REGION_NAME"])


@new_fanart.route("/<post_type>", methods=["POST"])
def upload_fanart(post_type):
    if "files" not in request.files:
        return jsonify({"success": False, "message": "No image to upload"}), 400

    post_type = request.form["post_type"]
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid Post type"}), 400

    post_title = request.form["post_title"] if "post_title" in request.form else ""
    if len(post_title) < 3:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Post title must be atleast three character long",
                }
            ),
            400,
        )

    post_author = request.form["post_author"] if "post_author" in request.form else ""
    if len(post_author) == 0:
        post_author = "Anonymous"

    post_author_link = (
        request.form["post_author_link"] if "post_author_link" in request.form else ""
    )
    if len(post_author_link) and validators.url(post_author_link, public=True) != True:
        return jsonify({"success": False, "message": "Invalid url"}), 400
    if len(post_author_link) == 0:
        post_author_link = "/anonymous/anon.jpg"

    post_secret = request.form["post_secret"] if "post_secret" in request.form else ""
    if validators.length(post_secret, min=6) != True:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Post secret must be atleast six characters long",
                }
            ),
            400,
        )
    post_secret = hashlib.sha256(post_secret.encode()).hexdigest()

    post_id = uuid.uuid1().hex
    post_date = datetime.now(timezone.utc).isoformat()
    image_data_list = request.files.getlist("files")
    image_key_list = []

    for i, img in enumerate(image_data_list):
        file_ext = os.path.splitext(img.filename)[1]
        filename = "%s%s" % (str(i), file_ext)
        image_key_list.append({"S": filename})

    try:
        db.put_item(
            TableName=os.environ["POST_TABLE"],
            Item={
                "post_type": {"S": post_type},
                "post_id": {"S": post_id},
                "post_title": {"S": post_title},
                "post_author": {"S": post_author},
                "post_author_link": {"S": post_author_link},
                "post_secret": {"S": post_secret},
                "post_date": {"S": post_date},
                "post_image": {"L": image_key_list},
            },
        )
        for img, name in zip(image_data_list, image_key_list):
            key = "%s/%s/%s" % (post_type, post_id, name["S"])
            try:
                s3.upload_fileobj(
                    img, os.environ["BUCKET_NAME"], key, {"ACL": "public-read"}
                )
            except:
                return jsonify({"success": True, "message": "Upload image failed"}), 500

        return jsonify({"success": True, "message": "Post successfully created"}), 200
    except:
        return jsonify({"success": False, "message": "An error occurred"}), 500

    return jsonify({"success": False, "message": "Bad Request"}), 400
