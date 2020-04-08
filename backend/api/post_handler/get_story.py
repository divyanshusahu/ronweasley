from flask import Blueprint, jsonify
import boto3
import os

get_story = Blueprint("get_story", __name__, url_prefix="/get_story")

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])

allowed_types = ["checkmated"]


@get_story.route("/<post_type>", methods=["GET"])
def get_story_by_post_type(post_type):
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid Story Type"}), 400

    projectionExpression = (
        "post_type, post_id, post_title, post_author, story_type, story_status"
    )

    try:
        result = db.query(
            TableName=os.environ["POST_TABLE"],
            ProjectionExpression=projectionExpression,
            KeyConditionExpression="post_type = :post_type",
            ExpressionAttributeValues={":post_type": {"S": post_type}},
        )

        return jsonify({"success": True, "stories": result["Items"]}), 200
    except Exception as e:
        print(e)
        return jsonify({"success": False, "message": "Bad Request"}), 400


@get_story.route("/<post_type>/<post_id>", methods=["GET"])
def get_story_by_post_id(post_type, post_id):
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid Story Type"}), 400

    projectionExpression = "post_type, post_id, post_title, post_author, story_type, story_status, story_url, chapters_url"

    try:
        result = db.get_item(
            TableName=os.environ["POST_TABLE"],
            Key={"post_type": {"S": post_type}, "post_id": {"S": post_id}},
            ProjectionExpression=projectionExpression,
        )
        if "Item" in result:
            return jsonify({"success": True, "story": result["Item"]}), 200
        else:
            return (
                jsonify({"success": False, "message": "This story does not exist"}),
                404,
            )
    except:
        return jsonify({"success": False, "message": "An error occurred"}), 500
