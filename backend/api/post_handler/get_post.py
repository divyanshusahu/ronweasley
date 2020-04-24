from flask import Blueprint, jsonify
import boto3
import os

get_post = Blueprint("get_post", __name__, url_prefix="/get_post")

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])

allowed_types = [
    "ron_weasley_appreciation",
    "ron_weasley_defense",
    "ron_weasley_fanart",
    "romione_appreciation",
    "romione_fanart",
    "golden_trio_appreciation",
    "golden_trio_fanart",
    "weasley_family_appreciation",
    "weasley_family_fanart",
    "ron_and_lavender_appreciation",
    "ron_and_lavender_fanart",
    "ron_and_harry_appreciation",
    "ron_and_harry_fanart",
    "ron_and_luna_appreciation",
    "ron_and_luna_fanart",
    "bug",
    "suggestion",
    "feedback",
    "reported_post",
]

suggestions_types = ["bug", "suggestion", "feedback", "reported_post"]


@get_post.route("/<post_type>", methods=["GET"])
def get_post_by_type(post_type):
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid Request"}), 400

    if post_type in suggestions_types:
        projectionExpression = """post_type, post_id, post_date, post_content, post_reply,
        post_reply_time, reported_post_type, reported_post_id, reported_post_reason"""
    else:
        projectionExpression = """post_type, post_id, post_title, post_author,
        post_author_link, post_date, post_summary, post_image"""

    try:
        result = db.query(
            TableName=os.environ["POST_TABLE"],
            ProjectionExpression=projectionExpression,
            KeyConditionExpression="post_type = :post_type",
            ExpressionAttributeValues={":post_type": {"S": post_type}},
        )

        data = result["Items"]

        while "LastEvaluatedKey" in result:
            result = db.query(
                TableName=os.environ["POST_TABLE"],
                ProjectionExpression=projectionExpression,
                KeyConditionExpression="post_type = :post_type",
                ExpressionAttributeValues={":post_type": {"S": post_type}},
                ExclusiveStartKey=result["LastEvaluatedKey"],
            )
            data.extend(result["Items"])

        send_result = sorted(data, key=lambda x: x["post_date"]["S"], reverse=True)

        return jsonify({"success": True, "posts": send_result}), 200
    except:
        return jsonify({"success": False, "message": "An error occurred"}), 500


@get_post.route("/<post_type>/<post_id>", methods=["GET"])
def get_post_by_id(post_type, post_id):
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid Request"}), 400

    projectionExpression = """post_type, post_id, post_title, post_author, post_author_link, 
    post_date, post_content, post_description, post_image, post_reported"""

    try:
        result = db.get_item(
            TableName=os.environ["POST_TABLE"],
            Key={"post_type": {"S": post_type}, "post_id": {"S": post_id}},
            ProjectionExpression=projectionExpression,
        )

        if "Item" in result:
            post = result["Item"]
            return jsonify({"success": True, "post": post}), 200
        else:
            return jsonify({"success": False, "message": "No post exist"}), 404
    except:
        return jsonify({"success": False, "message": "An error occurred"}), 500
