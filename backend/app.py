from flask import Flask
from flask_cors import CORS
from api.posts import posts
from api.suggestions import suggestions

app = Flask(__name__)
CORS(app, resources={
     r"*": {"origins": ["http://localhost:3000", "https://ronweasley.co"]}})
app.register_blueprint(posts)
app.register_blueprint(suggestions)


@app.route("/")
def hello():
    return "Weasley is Our King"
