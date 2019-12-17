import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function handlePost(data, content) {
  console.log(data);
  const url = BASE_URL + "/posts/new/" + data.type;
  const post_data = {
    title: data.title,
    author: data.author,
    author_link: data.author_link,
    secret: data.secret,
    content: content
  };
  axios.post(url, post_data).then(res => {
    console.log(res);
  });
}

export default handlePost;
