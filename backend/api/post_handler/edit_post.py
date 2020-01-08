from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
import boto3
import os
import hashlib

edit_post = Blueprint("edit_post", __name__, url_prefix="/edit_post")

if os.getenv("ENV") == "development":
    db = boto3.client("dynamodb", region_name="localhost",
                      endpoint_url="http://localhost:8000")
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


@edit_post.route("/secret_check", methods=["POST"])
def secret_check():
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    post_type = request.json.get("post_type", "")
    post_id = request.json.get("post_id", "")
    post_secret = request.json.get("post_secret", "")

    if len(post_secret) == 0:
        return jsonify({"success": False, "message": "Post secret cannot be empty"}), 400

    result = db.get_item(
        TableName=os.environ["POST_TABLE"],
        Key={
            "post_type": {
                "S": post_type
            },
            "post_id": {
                "S": post_id
            }
        },
        AttributesToGet=["post_secret"]
    )

    if "Item" in result:
        if result["Item"]["post_secret"]["S"] == hashlib.sha256(post_secret.encode()).hexdigest():
            access_token = create_access_token(identity=post_id)
            return jsonify({"success": True, "access_token": access_token}), 200
        else:
            return jsonify({"success": False, "message": "Wrong post secret"}), 400
    else:
        return jsonify({"success": False, "message": "No post exists."}), 400

    return jsonify({"success": False, "message": "Bad Request"}), 400

@edit_post.route("/identity_check", methods=["POST"])
@jwt_required
def identity_check():
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    post_id = request.json.get("post_id", "")
    identity = get_jwt_identity()
    if post_id == identity:
        return jsonify({"success": True}), 200
    return jsonify({"success": False, "message": "Unauthorized"}), 403

