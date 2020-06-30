const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

const handleEditPost = async (post_secret, post_type, post_id) => {
  let post_data = {
    post_secret: post_secret
  };
  const r1 = await fetch(`${BASE_URL}/edit_post/${post_type}/${post_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post_data)
  });
  const data = await r1.json();
  return data;
};

const handleDeletePost = async (post_secret, post_type, post_id) => {
  let post_data = {
    post_secret: post_secret
  };
  const r1 = await fetch(`${BASE_URL}/delete_post/${post_type}/${post_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post_data)
  });
  const data = await r1.json();
  return data;
};

const handleReportPost = async (reported_post_reason, post_type, post_id) => {
  let post_data = {
    reported_post_reason: reported_post_reason
  };
  const r1 = await fetch(`${BASE_URL}/report_post/${post_type}/${post_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post_data)
  });
  const data = await r1.json();
  return data;
};

export { handleEditPost, handleDeletePost, handleReportPost };
