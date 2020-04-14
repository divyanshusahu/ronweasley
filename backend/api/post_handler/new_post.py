from flask import Blueprint, jsonify, request
import boto3
import os
import uuid
from datetime import datetime, timezone
import validators
import hashlib
import requests

new_post = Blueprint("new_post", __name__, url_prefix="/new_post")

allowed_types = [
    "ron_weasley_appreciation",
    "ron_weasley_defense",
    "romione_appreciation",
    "golden_trio_appreciation",
    "weasley_family_appreciation",
    "ron_and_lavender_appreciation",
    "ron_and_harry_appreciation",
    "ron_and_luna_appreciation",
]

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


def valid_inputs(post_data):
    error = {"error": False}

    if len(post_data["post_title"]) == 0:
        error["error"] = True
        error["post_title"] = "Title must not be empty"
    elif validators.length(post_data["post_title"], min=3) != True:
        error["error"] = True
        error["post_title"] = "Title must be three characters long"

    if (
        len(post_data["post_author_link"])
        and validators.url(post_data["post_author_link"], public=True) != True
    ):
        error["error"] = True
        error["post_author_link"] = "Url must be valid"

    if validators.length(post_data["post_secret"], min=6) != True:
        error["error"] = True
        error["post_secret"] = "Secret must be six characters long"

    if validators.length(post_data["post_content"], min=1) != True:
        error["error"] = True
        error["post_content"] = "Content must not be empty"

    return error


@new_post.route("/<post_type>", methods=["POST"])
def insert_post(post_type):
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid post type"}), 400

    post_data = request.json
    error = valid_inputs(post_data)

    g_recaptcha_response = post_data["g-recaptcha-response"]
    recaptcha = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        data={
            "secret": os.environ["RECAPTCHA_SECRET_KEY"],
            "response": g_recaptcha_response,
        },
    )

    recaptcha_response = recaptcha.json()

    if recaptcha_response["success"] != True:
        return (
            jsonify({"success": False, "message": "Captcha verification failed"}),
            400,
        )

    if error["error"] == True:
        return jsonify({"success": False, "message": "Invalid Input Fields"}), 400

    post_id = uuid.uuid1().hex
    date = datetime.now(timezone.utc).isoformat()
    if len(post_data["post_author"]) == 0:
        post_data["post_author"] = "Anonymous"
    if len(post_data["post_author_link"]) == 0:
        post_data["post_author_link"] = "/anonymous/anon.jpg"

    post_data["post_secret"] = hashlib.sha256(
        post_data["post_secret"].encode()
    ).hexdigest()

    try:
        db.put_item(
            TableName=os.environ["POST_TABLE"],
            Item={
                "post_id": {"S": post_id},
                "post_title": {"S": post_data["post_title"]},
                "post_author": {"S": post_data["post_author"]},
                "post_author_link": {"S": post_data["post_author_link"]},
                "post_type": {"S": post_type},
                "post_content": {"S": post_data["post_content"]},
                "post_summary": {"S": post_data["post_summary"]},
                "post_secret": {"S": post_data["post_secret"]},
                "post_date": {"S": date},
            },
        )
        return (
            jsonify(
                {"success": True, "message": "New Post Created", "post_id": post_id}
            ),
            200,
        )
    except:
        return jsonify({"success": False, "message": "An error occurred"}), 500

    return jsonify({"success": False, "message": "Bad Request"}), 400
