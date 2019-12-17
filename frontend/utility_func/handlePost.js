import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

async function handlePost(data) {
  const url = BASE_URL + "/posts/new/" + data.type;
  const post_data = {
    title: data.title,
    author: data.author,
    author_link: data.author_link,
    secret: data.secret,
    content: data.content
  };
  return axios.post(url, post_data);
}

export default handlePost;
