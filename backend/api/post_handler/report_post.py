from flask import Blueprint, jsonify, request
import os
import boto3
from datetime import datetime, timezone
import uuid

report_post = Blueprint("report_post", __name__, url_prefix="/report_post")

if os.getenv("ENV") == "development":
    db = boto3.client(
        "dynamodb", region_name="localhost", endpoint_url="http://localhost:8000"
    )
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


@report_post.route("/<reported_post_type>/<reported_post_id>", methods=["POST"])
def report_post_by_id(reported_post_type, reported_post_id):
    if request.is_json == False:
        return jsonify({"success": False, "message": "Bad Request"}), 400

    reported_post_reason = request.json.get("reported_post_reason", "")

    post_id = uuid.uuid1().hex
    post_date = datetime.now(timezone.utc).isoformat()

    if len(reported_post_reason) < 3:
        return (
            jsonify(
                {
                    "success": False,
                    "message": "Reason should be atleast three characters long",
                }
            ),
            400,
        )

    try:
        result = db.update_item(
            TableName=os.environ["POST_TABLE"],
            Key={
                "post_type": {"S": reported_post_type},
                "post_id": {"S": reported_post_id},
            },
            ConditionExpression="post_type = :pt AND post_id = :pid",
            UpdateExpression="SET post_reported = if_not_exists(post_reported, :pr)",
            ExpressionAttributeValues={
                ":pt": {"S": reported_post_type},
                ":pid": {"S": reported_post_id},
                ":pr": {"BOOL": True},
            },
            ReturnValues="UPDATED_OLD",
        )
        if "Attributes" not in result:
            db.put_item(
                TableName=os.environ["POST_TABLE"],
                Item={
                    "post_type": {"S": "reported_post"},
                    "post_id": {"S": post_id},
                    "post_date": {"S": post_date},
                    "reported_post_type": {"S": reported_post_type},
                    "reported_post_id": {"S": reported_post_id},
                    "reported_post_reason": {"S": reported_post_reason},
                },
            )
            return jsonify({"success": True, "message": "Successfully reported"}), 200
        else:
            return jsonify({"success": False, "message": "Already reported"}), 400
    except db.exceptions.ConditionalCheckFailedException:
        return jsonify({"success": False, "message": "Post does not exist"}), 400

    return jsonify({"success": False, "message": "Bad request"}), 400
