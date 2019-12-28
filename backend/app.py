from flask import Flask
from flask_cors import CORS
from api.posts import posts
from api.suggestions import suggestions
from api.get_posts import get_posts

app = Flask(__name__)
CORS(app, resources={
     r"*": {"origins": ["http://localhost:3000", "https://ronweasley.co"]}})
app.register_blueprint(posts)
app.register_blueprint(suggestions)
app.register_blueprint(get_posts)


@app.route("/")
def hello():
    return "Weasley is Our King"
