from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
import boto3
import os
import hashlib
import validators

edit_fanart = Blueprint("edit_fanart", __name__, url_prefix="/edit_fanart")

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


@edit_fanart.route("/update/<post_type>/<post_id>", methods=["POST"])
@jwt_required
def update_post(post_type, post_id):
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    identity = get_jwt_identity()
    if identity != post_id:
        return jsonify({"success": False, "message": "Unauthorized"}), 403

    post_title = request.json.get("post_title", "")
    if len(post_title) == 0:
        return (
            jsonify({"success": False, "message": "Post Title must not be empty"}),
            400,
        )
    if validators.length(post_title, min=3) != True:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Post title must be three characters long",
                }
            ),
            400,
        )

    post_author = request.json.get("post_author", "")
    if len(post_author) == 0:
        post_author = "Anonymous"

    post_author_link = request.json.get("post_author_link", "")
    if len(post_author_link) and validators.url(post_author_link, public=True) != True:
        return jsonify({"success": False, "message": "Url must be valid"}), 400
    if len(post_author_link) == 0:
        post_author_link = "/anonymous/anon.jpg"

    post_description = request.json.get("post_description", "")

    post_nsfw = request.json.get("post_nsfw", False)

    post_secret = request.json.get("post_secret", "")

    update_expression = "SET post_title = :post_title, post_author = :post_author, \
    post_author_link = :post_author_link, post_description = :post_description, \
    post_nsfw = :post_nsfw"

    expression_attribute_values = {}
    expression_attribute_values[":post_type"] = {"S": post_type}
    expression_attribute_values[":post_id"] = {"S": post_id}
    expression_attribute_values[":post_title"] = {"S": post_title}
    expression_attribute_values[":post_author"] = {"S": post_author}
    expression_attribute_values[":post_author_link"] = {"S": post_author_link}
    expression_attribute_values[":post_description"] = {"S": post_description}
    expression_attribute_values[":post_nsfw"] = {"BOOL": post_nsfw}

    try:
        db.update_item(
            TableName=os.environ["POST_TABLE"],
            Key={"post_type": {"S": post_type}, "post_id": {"S": post_id}},
            ConditionExpression="post_type = :post_type AND post_id = :post_id",
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
        )
    except db.exceptions.ConditionalCheckFailedException:
        return jsonify({"success": False, "message": "Post does not exist"}), 404

    if len(post_secret) == 0:
        return jsonify({"success": True, "message": "Successfully Updated"}), 200
    else:
        if validators.length(post_secret, min=6) != True:
            return (
                jsonify(
                    {
                        "success": True,
                        "message": "Post secret must be six characters long",
                    }
                ),
                400,
            )

        post_secret = hashlib.sha256(post_secret.encode()).hexdigest()
        try:
            db.update_item(
                TableName=os.environ["POST_TABLE"],
                Key={"post_type": {"S": post_type}, "post_id": {"S": post_id}},
                ConditionExpression="post_type = :post_type AND post_id = :post_id",
                UpdateExpression="SET post_secret = :post_secret",
                ExpressionAttributeValues={
                    ":post_type": {"S": post_type},
                    ":post_id": {"S": post_id},
                    ":post_secret": {"S": post_secret},
                },
            )
            return jsonify({"success": True, "message": "Successfully Updated"}), 200
        except db.exceptions.ConditionalCheckFailedException:
            return jsonify({"success": False, "message": "Post does not exist"}), 404

    return jsonify({"success": False, "message": "Bad Request"}), 400
