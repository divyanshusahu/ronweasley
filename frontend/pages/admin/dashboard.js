import Link from "next/link";
import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";

import { Row, Col, Card, Button, List, Icon, Popconfirm, message } from "antd";

import SecondaryLayout from "../../components/SecondaryLayout";
import ErrorLayout from "../../components/ErrorLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Dashboard(props) {
  if (!props.authorized) {
    return (
      <div>
        <ErrorLayout
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link href="/admin/login">
              <Button type="primary">Back to Login</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const [reportedPost, setRepotedPost] = React.useState([]);

  const getPost = type => {
    return fetch(BASE_URL + "/get_post/" + type).then(r => r.json());
  };

  React.useEffect(() => {
    getPost("reported_post").then(data => {
      if (data.success) {
        setRepotedPost(data.posts);
      }
    });
  }, []);

  const handlePostDelete = (
    reported_post_type,
    reported_post_id,
    post_id,
    action
  ) => {
    message.loading({
      content: "Action in progress",
      duration: 0,
      key: "deletePostMessage"
    });
    if (action === "ignore_post") {
      let post_data = {
        reported_post_type: reported_post_type,
        reported_post_id: reported_post_id
      };
      fetch(`${BASE_URL}/admin/ignore_report/${post_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(post_data)
      })
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            message.success({
              content: data.message,
              key: "deletePostMessage"
            });
            getPost("reported_post").then(d => {
              if (d.success) {
                setRepotedPost(d.posts);
              }
            });
          } else {
            message.error({ content: data.message, key: "deletePostMessage" });
          }
        });
    } else if (action === "delete_post") {
      fetch(
        `${BASE_URL}/admin/delete_post/${reported_post_type}/${reported_post_id}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${props.access_token}` }
        }
      )
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            message.loading({
              content: "Post deleted. Deleting reported entry.",
              duration: 0,
              key: "deletePostMessage"
            });
            fetch(`${BASE_URL}/admin/delete_post/reported_post/${post_id}`, {
              method: "POST",
              headers: { Authorization: `Bearer ${props.access_token}` }
            })
              .then(r => r.json())
              .then(data => {
                if (data.success) {
                  message.success({
                    content: data.message,
                    key: "deletePostMessage"
                  });
                  getPost("reported_post").then(d => {
                    if (d.success) {
                      setRepotedPost(d.posts);
                    }
                  });
                } else {
                  message.error({
                    content: data.message,
                    key: "deletePostMessage"
                  });
                }
              });
          } else {
            message.error({ content: data.message, key: "deletePostMessage" });
          }
        });
    }
  };

  return (
    <div>
      <SecondaryLayout title="Admin Dashboard">
        <div className="admin_area">
          <Row gutter={[0, 32]}>
            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 9, offset: 1 }}>
              <Card title="Reported Post">
                <List
                  itemLayout="horizontal"
                  dataSource={reportedPost}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Popconfirm
                          title="Confirm delete?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() =>
                            handlePostDelete(
                              item.reported_post_type["S"],
                              item.reported_post_id["S"],
                              item.post_id["S"],
                              "delete_post"
                            )
                          }
                        >
                          <Icon type="delete" title="Delete Post" />
                        </Popconfirm>,
                        <Popconfirm
                          title="Ignore this report?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() =>
                            handlePostDelete(
                              item.reported_post_type["S"],
                              item.reported_post_id["S"],
                              item.post_id["S"],
                              "ignore_post"
                            )
                          }
                        >
                          <Icon type="close" title="Ignore Report" />
                        </Popconfirm>
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Link
                            href={`/post/${item.reported_post_type["S"]}/${item.reported_post_id["S"]}`}
                          >
                            <a>{item.reported_post_type["S"]}</a>
                          </Link>
                        }
                        description={item.reported_post_reason["S"]}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: 1 }}>
              <Row gutter={[0, 32]}>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                  <Card title="Bugs"></Card>
                </Col>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 2 }}>
                  <Card title="Suggestions"></Card>
                </Col>
              </Row>
              <Row gutter={[0, 32]}>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                  <Card title="Help Needed"></Card>
                </Col>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 2 }}>
                  <Card title="Currently Working On"></Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </SecondaryLayout>
      <style jsx>
        {`
          .admin_area {
            margin: 64px 0;
          }
        `}
      </style>
    </div>
  );
}

Dashboard.getInitialProps = async ctx => {
  const { access_token } = cookies(ctx);
  const r1 = await fetch(BASE_URL + "/admin/identity_check", {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  const result = await r1.json();
  if (result.success) {
    return { authorized: true, access_token: access_token };
  }
  return { authorized: false };
};

export default Dashboard;
