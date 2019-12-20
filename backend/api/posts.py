from flask import Blueprint, jsonify, request
import boto3
import os
import uuid
import json
from datetime import datetime
import validators
import hashlib

posts = Blueprint("posts", __name__, url_prefix="/posts")

allowed_types = ["ron_weasley_appreciation",
                 "ron_weasley_defense", "romione_appreciation"]

if os.getenv("ENV") == "development":
    db = boto3.client("dynamodb", region_name="localhost",
                      endpoint_url="http://localhost:8000")
else:
    db = boto3.client("dynamodb", region_name=os.environ["REGION_NAME"])


def valid_inputs(post_data):
    error = {"error": False}

    if len(post_data["title"]) == 0:
        error["error"] = True
        error["title"] = "Title must not be empty"
    elif validators.length(post_data["title"], min=3) != True:
        error["error"] = True
        error["title"] = "Title must be three characters long"

    if len(post_data["author_link"]) and validators.url(post_data["author_link"], public=True) != True:
        error["error"] = True
        error["author_link"] = "Url must be valid"

    if validators.length(post_data["secret"], min=6) != True:
        error["error"] = True
        error["secret"] = "Secret must be six characters long"

    if validators.length(post_data["content"], min=1) != True:
        error["error"] = True
        error["content"] = "Content must not be empty"

    return error


@posts.route("/post_type/<post_type>", methods=["GET"])
def get_posts(post_type):
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid post type"}), 400

    result = db.query(TableName=os.environ["POST_TABLE"],
                      IndexName="PostTypeIndex",
                      Select="ALL_ATTRIBUTES",
                      KeyConditionExpression="post_type = :post_value",
                      ExpressionAttributeValues={":post_value": {"S": post_type}})

    send_result = []
    for p in result["Items"]:
        temp = p
        del temp["secret"]
        send_result.append(temp)

    return jsonify({"success": True, "posts": send_result})


@posts.route("/pid/<post_id>", methods=["GET"])
def get_posts_by_id(post_id):
    result = db.query(TableName=os.environ["POST_TABLE"],
                      Select="ALL_ATTRIBUTES",
                      KeyConditionExpression="post_id = :pid",
                      ExpressionAttributeValues={":pid": {"S": post_id}})

    if len(result["Items"]) == 0:
        return jsonify({"success": False}), 404

    del result["Items"][0]["secret"]

    return jsonify({"success": True, "post": result["Items"]})


@posts.route("/new/<post_type>", methods=["POST"])
def insert_post(post_type):
    if post_type not in allowed_types:
        return jsonify({"success": False, "message": "Invalid post type"}), 400

    post_data = json.loads(request.data.decode("utf-8"))
    error = valid_inputs(post_data)

    if error["error"] == True:
        return jsonify({"success": False, "error": error}), 400

    post_id = uuid.uuid1().hex
    date = datetime.now().isoformat()
    if len(post_data["author"]) == 0:
        post_data["author"] = "Anonymous"
    if len(post_data["author_link"]) == 0:
        post_data["author_link"] = "https://i.imgur.com/MfX7hkj.jpg"

    post_data["secret"] = hashlib.sha256(
        post_data["secret"].encode()).hexdigest()

    try:
        db.create_table(AttributeDefinitions=[
            {"AttributeName": "post_id", "AttributeType": "S"},
            {"AttributeName": "post_date", "AttributeType": "S"},
            {"AttributeName": "post_type", "AttributeType": "S"}],
            TableName=os.environ["POST_TABLE"],
            KeySchema=[
            {"AttributeName": "post_id", "KeyType": "HASH"},
            {"AttributeName": "post_date", "KeyType": "RANGE"}],
            BillingMode="PAY_PER_REQUEST",
            GlobalSecondaryIndexes=[
            {
                "IndexName": "PostTypeIndex",
                "KeySchema": [{"AttributeName": "post_type", "KeyType": "HASH"}],
                "Projection": {"ProjectionType": "KEYS_ONLY"}
            }])

        try:
            db.put_item(TableName=os.environ["POST_TABLE"], Item={
                "post_id": {"S": post_id},
                "title": {"S": post_data["title"]},
                "author": {"S": post_data["author"]},
                "author_link": {"S": post_data["author_link"]},
                "post_type": {"S": post_type},
                "content": {"S": post_data["content"]},
                "secret": {"S": post_data["secret"]},
                "post_date": {"S": date},
                "reported": {"BOOL": False}
            })
            return jsonify({"success": True, "message": "New Post Created"}), 200
        except:
            return jsonify({"success": False, "message": "An error occurred"}), 400

    except db.exceptions.ResourceInUseException:
        try:
            db.put_item(TableName=os.environ["POST_TABLE"], Item={
                "post_id": {"S": post_id},
                "title": {"S": post_data["title"]},
                "author": {"S": post_data["author"]},
                "author_link": {"S": post_data["author_link"]},
                "post_type": {"S": post_type},
                "content": {"S": post_data["content"]},
                "secret": {"S": post_data["secret"]},
                "post_date": {"S": date},
                "reported": {"BOOL": False}
            })
            return jsonify({"success": True, "message": "New Post Created"}), 200
        except:
            return jsonify({"success": False, "message": "An error occurred"}), 400

    return jsonify({"success": False, "message": "An error occurred"}), 400
