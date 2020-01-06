from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
import os
import json

admin = Blueprint("admin", __name__, url_prefix="/admin")


@admin.route("/login", methods=["POST"])
def login():
    post_data = json.loads(request.data.decode("utf-8"))

    if len(post_data["username"]) == 0:
        return jsonify({"success": False, "message": "Username must not be empty"}), 400
    if len(post_data["password"]) == 0:
        return jsonify({"success": False, "message": "Password must not be empty"}), 400

    if post_data["username"] != os.environ["ADMIN_USERNAME"] or post_data["password"] != os.environ["ADMIN_PASSWORD"]:
        return jsonify({"success": False, "message": "Invalid username or password"}), 400

    access_token = create_access_token(identity=post_data["username"])
    return jsonify({"success": True, "access_token": access_token}), 200


@admin.route("/identity_check", methods=["GET"])
@jwt_required
def protected():
    identity = get_jwt_identity()
    if identity == os.environ["ADMIN_USERNAME"]:
        return jsonify({"success": True}), 200
    return jsonify({"success": False}), 403
