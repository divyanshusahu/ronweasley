from flask import Blueprint, jsonify, request
import boto3
import os
import uuid
import json
from datetime import datetime
import validators

posts = Blueprint("posts", __name__, url_prefix="/posts")

allowed_types = ["ron_weasley_appreciation",
                 "ron_weasley_defense", "romione_appreciation"]

if os.getenv("ENV") == "development":
    db = boto3.client("dynamodb", region_name="localhost",
                      endpoint_url="http://localhost:8000")
else:
    db = boto3.client("dynamodb", region_name=os.getenv("REGION_NAME"))


def valid_inputs(post_data):
    error = {"error": False}

    if len(post_data["title"]) == 0:
        error["error"] = True
        error["title"] = "Title must not be empty"
    elif validators.length(post_data["title"], min=3) != True:
        error["error"] = True
        error["title"] = "Title must be three characters long"

    if validators.url(post_data["author_link"], public=True) != True:
        error["error"] = True
        error["author_link"] = "Url must be valid"

    if validators.length(post_data["secret"], min=6) != True:
        error["error"] = True
        error["secret"] = "Secret must be six characters long"

    return error


@posts.route("/<post_type>", methods=["GET"])
def get_posts(post_type):
    if post_type not in allowed_types:
        return jsonify({"success": False, "error_message": "Invalid post type"}), 400
    return jsonify({"success": True, "type": type})


@posts.route("/new/<post_type>", methods=["POST"])
def insert_post(post_type):
    if post_type not in allowed_types:
        return jsonify({"success": False, "error_message": "Invalid post type"}), 400

    post_data = json.loads(request.data.decode("utf-8"))
    error = valid_inputs(post_data)

    if error["error"] == True:
        return jsonify({"success": False, "error": error}), 400

    tables = db.list_tables()["TableNames"]
    if os.getenv("POST_TABLE") not in tables:
        db.create_table(AttributeDefinations=[
            {"AttributeName": "post_id", "AttributeType": "S"},
            {"AttributeName": "title",
             "AttributeType": "S"},
            {"AttributeName": "author",
             "AttributeType": "S"},
            {"AttributeName": "author_link",
             "AttributeType": "S"},
            {"AttributeName": "type", "AttributeType": "S"},
            {"AttributeName": "content",
             "AttributeType": "S"},
            {"AttributeName": "secret",
             "AttributeType": "S"},
            {"AttributeName": "date", "AttributeType": "S"},
            {"AttributeName": "reported",
             "AttributeType": "B"}
        ],
            TableName=os.getenv("POST_TABLE"),
            KeySchema=[
            {"AttributeName": "id", "KeyType": "HASH"},
            {"AttributeName": "date",
             "KeyType": "RANGE"}
        ])
        post_id = uuid.uuid1().hex
        date = datetime.now().isoformat()
        try:
            db.put_item(TableName=os.getenv("POST_TABLE"), Item={
                "post_id": {"S": post_id},
                "title": {"S": post_data["title"]},
                "author": {"S": post_data["author"]},
                "author_link": {"S": post_data["author_link"]},
                "type": {"S": post_type},
                "content": {"S": post_data["content"]},
                "secret": {"S": post_data["secret"]},
                "date": {"S": date},
                "reported": {"B": False}
            })
            return jsonify({"success": True, "message": "New Post Created"}), 200
        except:
            return jsonify({"success": False, "error_message": "An error occurred"}), 400
    else:
        try:
            db.put_item(TableName=os.getenv("POST_TABLE"), Item={
                "post_id": {"S": post_id},
                "title": {"S": post_data["title"]},
                "author": {"S": post_data["author"]},
                "author_link": {"S": post_data["author_link"]},
                "type": {"S": post_type},
                "content": {"S": post_data["content"]},
                "secret": {"S": post_data["secret"]},
                "date": {"S": date},
                "reported": {"B": False}
            })
            return jsonify({"success": True, "message": "New Post Created"}), 200
        except:
            return jsonify({"success": False, "error_message": "An error occurred"}), 400

    return jsonify({"success": False, "error_message": "An error occurred"}), 400
