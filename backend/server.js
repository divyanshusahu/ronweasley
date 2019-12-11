const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sls = require("serverless-http");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

if (true) {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//const port = process.env.PORT || 5000;

//app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports.server = sls(app);
