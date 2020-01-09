import Link from "next/link";

import fetch from "isomorphic-unfetch";
import cookies from "next-cookies";

import { Button, Card, Input } from "antd";

import SecondaryLayout from "../../../components/SecondaryLayout";
import ErrorLayout from "../../../components/ErrorLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function EditPost(props) {
  if (!props.post_exist) {
    return (
      <ErrorLayout
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <a>
              <Button type="primary">Back Home</Button>
            </a>
          </Link>
        }
      />
    );
  }

  if (!props.authorized) {
    return (
      <ErrorLayout
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Link href="/">
            <a>
              <Button type="primary">Back Home</Button>
            </a>
          </Link>
        }
      />
    );
  }

  const post = props.post;

  return (
    <div>
      <SecondaryLayout title={`Edit Post: ${post.post_title["S"]}`}>
        <div className="edit_post">
          <Card title="Edit Post" extra="sds" >

          </Card>
        </div>
      </SecondaryLayout>
      <style jsx>
        {`
          .edit_post {
            margin-top: 64px;
          }
        `}
      </style>
    </div>
  );
}

EditPost.getInitialProps = async ctx => {
  const post_type = ctx.query.post_type;
  const post_id = ctx.query.pid;
  const r1 = await fetch(`${BASE_URL}/get_post/${post_type}/${post_id}`);
  const d1 = await r1.json();
  if (d1.success) {
    const access_token = cookies(ctx)[post_id];
    const r2 = await fetch(`${BASE_URL}/edit_post/identity_check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
      },
      body: JSON.stringify({ post_id: post_id })
    });
    const d2 = await r2.json();
    if (d2.success) {
      return { post_exist: true, authorized: true, post: d1.post };
    } else {
      return { post_exist: true, authorized: false };
    }
  } else {
    return { post_exist: false };
  }
};

export default EditPost;
