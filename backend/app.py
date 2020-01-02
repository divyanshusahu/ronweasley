from flask import Flask
from flask_cors import CORS
from api.new_post import new_post
from api.suggestions import suggestions
from api.get_posts import get_posts
from api.delete_post import delete_post

app = Flask(__name__)
CORS(app, resources={
     r"*": {"origins": ["http://localhost:3000", "https://ronweasley.co"]}})
app.register_blueprint(new_post)
app.register_blueprint(suggestions)
app.register_blueprint(get_posts)
app.register_blueprint(delete_post)


@app.route("/")
def hello():
    return "Weasley is Our King", 200
