from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
import boto3
import os

admin = Blueprint("admin", __name__, url_prefix="/admin")

if os.getenv("ENV") == "development":
    db = boto3.client("dynamodb", region_name="localhost",
                      endpoint_url="http://localhost:8000")
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

    if username != os.environ["ADMIN_USERNAME"] or password != os.environ["ADMIN_PASSWORD"]:
        return jsonify({"success": False, "message": "Invalid username or password"}), 400

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
            Key={
                "post_type": {
                    "S": post_type
                },
                "post_id": {
                    "S": post_id
                }
            },
            ConditionExpression="post_type = :pt AND post_id = :pid",
            ExpressionAttributeValues={
                ":pt": {
                    "S": post_type
                },
                ":pid": {
                    "S": post_id
                }
            }
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
        return jsonify({"success": False, "message": "Post type must not be empty"}), 400
    if len(reported_post_id) == 0:
        return jsonify({"success": False, "message": "Post id must not be empty"}), 400

    try:
        db.update_item(
            TableName=os.environ["POST_TABLE"],
            Key={
                "post_type": {
                    "S": reported_post_type
                },
                "post_id": {
                    "S": reported_post_id
                }
            },
            ConditionExpression="post_type = :pt AND post_id = :pid",
            UpdateExpression="SET post_reported = :pr",
            ExpressionAttributeValues={
                ":pt": {
                    "S": reported_post_type
                },
                ":pid": {
                    "S": reported_post_id
                },
                ":pr": {
                    "BOOL": False
                }
            }
        )
        db.delete_item(
            TableName=os.environ["POST_TABLE"],
            Key={
                "post_type": {
                    "S": "reported_post"
                },
                "post_id": {
                    "S": post_id
                }
            }
        )

        return jsonify({"success": True, "message": "Successfully Deleted"}), 200

    except db.exceptions.ConditionalCheckFailedException:
        return jsonify({"success": False, "message": "Post does not exist"}), 400

    return jsonify({"success": False, "message": "Bad Request"}), 400
