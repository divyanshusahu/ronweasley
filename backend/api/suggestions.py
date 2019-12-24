from flask import Blueprint, jsonify, request
import boto3
import os
import uuid
import json
from datetime import datetime

suggestions = Blueprint("suggestions", __name__, url_prefix="/suggestions")

if os.getenv("ENV") == "development":
    db = boto3.client("dynamodb", region_name="localhost",
                      endpoint_url="http://localhost:8000")
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


@suggestions.route("/get/<post_type>", methods=["GET"])
def get_suggestions(post_type):
    try:
        result = db.query(
            TableName=os.environ["SUGGESTION_TABLE"],
            Select="ALL_ATTRIBUTES",
            KeyConditionExpression="post_type = :pt",
            ExpressionAttributeValues={":pt": {"S": post_type}}
        )

        return jsonify({"success": True, "posts": result["Items"]}), 200
    except:
        return jsonify({"success": False, "message": "Invaild Request"}), 400


@suggestions.route("/new", methods=["POST"])
def add_suggestions():
    data = json.loads(request.data.decode("utf-8"))
    if len(data["content"]) < 4:
        return jsonify({"success": False, "message": "Content should be atleast four characters long"}), 400

    post_id = uuid.uuid1().hex
    date = datetime.now().isoformat()

    try:
        db.create_table(AttributeDefinitions=[
            {"AttributeName": "post_id", "AttributeType": "S"},
            {"AttributeName": "post_type", "AttributeType": "S"}
        ],
            TableName=os.environ["SUGGESTION_TABLE"],
            KeySchema=[
                {"AttributeName": "post_type", "KeyType": "HASH"},
                {"AttributeName": "post_id", "KeyType": "RANGE"}
        ],
            BillingMode="PAY_PER_REQUEST"
        )
        try:
            db.put_item(TableName=os.environ["SUGGESTION_TABLE"], Item={
                "post_id": {"S": post_id},
                "post_type": {"S": data["post_type"]},
                "post_date": {"S": date},
                "content": {"S": data["content"]}
            })
            return jsonify({"success": True, "message": "Successfully Added"}), 200
        except:
            return jsonify({"success": False, "message": "An error occurred"}), 500

    except db.exceptions.ResourceInUseException:
        try:
            db.put_item(TableName=os.environ["SUGGESTION_TABLE"], Item={
                "post_id": {"S": post_id},
                "post_type": {"S": data["post_type"]},
                "post_date": {"S": date},
                "content": {"S": data["content"]}
            })
            return jsonify({"success": True, "message": "Successfully Added"}), 200
        except:
            return jsonify({"success": False, "message": "An error occurred"}), 500
