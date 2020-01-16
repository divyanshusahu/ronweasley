from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
import boto3
import os
from datetime import datetime, timezone

admin = Blueprint("admin", __name__, url_prefix="/admin")

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


@admin.route("/login", methods=["POST"])
def login():
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    username = request.json.get("username", "")
    password = request.json.get("password", "")

    if len(username) == 0:
        return jsonify({"success": False, "message": "Username must not be empty"}), 400
    if len(password) == 0:
        return jsonify({"success": False, "message": "Password must not be empty"}), 400

    if (
        username != os.environ["ADMIN_USERNAME"]
        or password != os.environ["ADMIN_PASSWORD"]
    ):
        return (
            jsonify({"success": False, "message": "Invalid username or password"}),
            400,
        )

    access_token = create_access_token(identity=username)
    return jsonify({"success": True, "access_token": access_token}), 200


@admin.route("/identity_check", methods=["GET"])
@jwt_required
def identity_check():
    identity = get_jwt_identity()
    if identity == os.environ["ADMIN_USERNAME"]:
        return jsonify({"success": True}), 200
    return jsonify({"success": False}), 403


@admin.route("/delete_post/<post_type>/<post_id>", methods=["POST"])
@jwt_required
def delete_post(post_type, post_id):
    try:
        db.delete_item(
            TableName=os.environ["POST_TABLE"],
            Key={"post_type": {"S": post_type}, "post_id": {"S": post_id}},
            ConditionExpression="post_type = :post_type AND post_id = :post_id",
            ExpressionAttributeValues={
                ":post_type": {"S": post_type},
                ":post_id": {"S": post_id},
            },
        )
        return jsonify({"success": True, "message": "Delete Successful"}), 200
    except db.exceptions.ConditionalCheckFailedException:
        return jsonify({"success": False, "message": "Post not exist"}), 400

    return jsonify({"success": False, "message": "Bad request"}), 400


@admin.route("/ignore_report/<post_id>", methods=["POST"])
@jwt_required
def ignore_report(post_id):
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    reported_post_type = request.json.get("reported_post_type", "")
    reported_post_id = request.json.get("reported_post_id", "")

    if len(reported_post_type) == 0:
        return (
            jsonify({"success": False, "message": "Post type must not be empty"}),
            400,
        )
    if len(reported_post_id) == 0:
        return jsonify({"success": False, "message": "Post id must not be empty"}), 400

    try:
        db.update_item(
            TableName=os.environ["POST_TABLE"],
            Key={
                "post_type": {"S": reported_post_type},
                "post_id": {"S": reported_post_id},
            },
            ConditionExpression="post_type = :post_type AND post_id = :post_id",
            UpdateExpression="SET post_reported = :post_reported",
            ExpressionAttributeValues={
                ":post_type": {"S": reported_post_type},
                ":post_id": {"S": reported_post_id},
                ":post_reported": {"BOOL": False},
            },
        )
        db.delete_item(
            TableName=os.environ["POST_TABLE"],
            Key={"post_type": {"S": "reported_post"}, "post_id": {"S": post_id}},
        )

        return jsonify({"success": True, "message": "Successfully Deleted"}), 200

    except db.exceptions.ConditionalCheckFailedException:
        return jsonify({"success": False, "message": "Post does not exist"}), 400

    return jsonify({"success": False, "message": "Bad Request"}), 400


@admin.route("/reply_post/<post_type>/<post_id>", methods=["POST"])
@jwt_required
def reply_post(post_type, post_id):
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    identity = get_jwt_identity()

    if identity != os.environ["ADMIN_USERNAME"]:
        return jsonify({"success": False, "message": "Unauthorized"}), 403

    post_reply = request.json.get("post_reply", "")

    if len(post_reply) < 4:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Reply must be atleast four characters long",
                }
            ),
            400,
        )

    post_reply_time = datetime.now(timezone.utc).isoformat()

    try:
        db.update_item(
            TableName=os.environ["POST_TABLE"],
            Key={"post_type": {"S": post_type}, "post_id": {"S": post_id}},
            ConditionExpression="post_type = :post_type AND post_id = :post_id",
            UpdateExpression="SET post_reply = :post_reply, post_reply_time = :post_reply_time",
            ExpressionAttributeValues={
                ":post_type": {"S": post_type},
                ":post_id": {"S": post_id},
                ":post_reply": {"S": post_reply},
                ":post_reply_time": {"S": post_reply_time},
            },
        )
        return jsonify({"success": True, "message": "Successfully Replied"}), 200
    except db.exceptions.ConditionalCheckFailedException:
        return jsonify({"success": False, "message": "Post does not exist"}), 404

    return jsonify({"success": False, "message": "Bad Request"}), 400
