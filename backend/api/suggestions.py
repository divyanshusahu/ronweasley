from flask import Blueprint, jsonify, request
import boto3
import os
import uuid
from datetime import datetime, timezone

suggestions = Blueprint("suggestions", __name__, url_prefix="/new_suggestion")

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


@suggestions.route("/<suggestion_type>", methods=["POST"])
def add_suggestions(suggestion_type):
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    post_content = request.json.get("post_content", "")
    if len(post_content) < 4:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Content should be atleast four characters long",
                }
            ),
            400,
        )

    if suggestion_type not in ["bug", "suggestion", "feedback"]:
        return jsonify({"success": False, "message": "Invalid Request"}), 400

    post_id = uuid.uuid1().hex
    date = datetime.now(timezone.utc).isoformat()

    try:
        db.put_item(
            TableName=os.environ["POST_TABLE"],
            Item={
                "post_id": {"S": post_id},
                "post_type": {"S": suggestion_type},
                "post_date": {"S": date},
                "post_content": {"S": post_content},
            },
        )
        return jsonify({"success": True, "message": "Successfully Added"}), 200
    except:
        return jsonify({"success": False, "message": "An error occurred"}), 500
