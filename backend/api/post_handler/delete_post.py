from flask import Blueprint, jsonify, request
import boto3
import os
import hashlib

delete_post = Blueprint("delete_post", __name__, url_prefix="/delete_post")

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


@delete_post.route("/<post_type>/<post_id>", methods=["POST"])
def delete_post_by_id(post_type, post_id):
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    post_secret = hashlib.sha256(
        request.json.get("post_secret", "").encode()
    ).hexdigest()

    try:
        result = db.delete_item(
            TableName=os.environ["POST_TABLE"],
            Key={"post_type": {"S": post_type}, "post_id": {"S": post_id}},
            ConditionExpression="post_secret = :post_secret",
            ExpressionAttributeValues={":post_secret": {"S": post_secret}},
            ReturnValues="ALL_OLD",
        )
        if len(result["Attributes"]) != 0:
            return (
                jsonify({"success": True, "message": "Post successfully deleted"}),
                200,
            )
        else:
            return jsonify({"success": False, "message": "An error occurred"}), 500
    except db.exceptions.ConditionalCheckFailedException:
        return jsonify({"success": False, "message": "Wrong Post secret"}), 400

    return jsonify({"success": False, "message": "Bad request"}), 400
