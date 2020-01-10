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
    "bug",
    "suggestion",
    "feedback",
    "reported_post",
]


@get_post.route("/<post_type>", methods=["GET"])
def get_post_by_type(post_type):
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid Request"}), 400

    try:
        result = db.query(
            TableName=os.environ["POST_TABLE"],
            Select="ALL_ATTRIBUTES",
            KeyConditionExpression="post_type = :post_type",
            ExpressionAttributeValues={":post_type": {"S": post_type}},
        )

        send_result = []

        for post in result["Items"]:
            post.pop("post_secret", None)
            send_result.append(post)

        send_result = sorted(
            send_result, key=lambda x: x["post_date"]["S"], reverse=True
        )

        return jsonify({"success": True, "posts": send_result}), 200
    except:
        return jsonify({"success": False, "message": "An error occurred"}), 500


@get_post.route("/<post_type>/<post_id>", methods=["GET"])
def get_post_by_id(post_type, post_id):
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid Request"}), 400

    try:
        result = db.get_item(
            TableName=os.environ["POST_TABLE"],
            Key={"post_type": {"S": post_type}, "post_id": {"S": post_id}},
        )

        if "Item" in result:
            post = result["Item"]
            post.pop("post_secret", None)
            return jsonify({"success": True, "post": post}), 200
        else:
            return jsonify({"success": False, "message": "No post exist"}), 404
    except:
        return jsonify({"success": False, "message": "An error occurred"}), 500
