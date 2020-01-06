from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from api.post_handler.new_post import new_post
from api.suggestions import suggestions
from api.post_handler.get_post import get_post
from api.post_handler.delete_post import delete_post
from api.post_handler.report_post import report_post
from api.admin import admin

app = Flask(__name__)

CORS(app, resources={
     r"*": {"origins": ["http://localhost:3000", "https://ronweasley.co"]}})

app.config["JWT_SECRET_KEY"] = "secret"
app.config["JWT_ERROR_MESSAGE_KEY"] = "message"
jwt = JWTManager(app)

app.register_blueprint(new_post)
app.register_blueprint(suggestions)
app.register_blueprint(get_post)
app.register_blueprint(delete_post)
app.register_blueprint(report_post)
app.register_blueprint(admin)


@app.route("/")
def hello():
    return "Weasley is Our King", 200
