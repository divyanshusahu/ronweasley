from flask import Blueprint, jsonify, request
import boto3
import os
import hashlib
import json

delete_post = Blueprint("delete_post", __name__, url_prefix="/delete_post")

if os.getenv("ENV") == "development":
    db = boto3.client("dynamodb", region_name="localhost",
                      endpoint_url="http://localhost:8000")
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


@delete_post.route("/<post_type>/<post_id>", methods=["POST"])
def delete_post_by_id(post_type, post_id):
    post_data = json.loads(request.data.decode("utf-8"))
    post_secret = hashlib.sha256(
        post_data["post_secret"].encode()).hexdigest()

    try:
        result = db.delete_item(
            TableName=os.environ["POST_TABLE"],
            Key={
                "post_type": {
                    "S": post_type
                },
                "post_id": {
                    "S": post_id
                }
            },
            ConditionExpression="post_secret = :ps",
            ExpressionAttributeValues={
                ":ps": {
                    "S": post_secret
                }
            },
            ReturnValues="ALL_OLD"
        )
        if len(result["Attributes"]) != 0:
            return jsonify({"success": True, "message": "Post successfully deleted"}), 200
        else:
            return jsonify({"success": False, "message": "An error occurred"}), 500
    except db.exceptions.ConditionalCheckFailedException:
        return jsonify({"success": False, "message": "Wrong Post secret"}), 400

    return jsonify({"success": False, "message": "Bad request"}), 400
