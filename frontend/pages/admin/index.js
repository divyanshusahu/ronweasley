import Link from "next/link";
import cookies from "next-cookies";
import fetch from "isomorphic-unfetch";
import isEmpty from "is-empty";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Popconfirm,
  message,
  Modal,
  Input,
} from "antd";

import {
  DeleteOutlined,
  CloseOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import TimeAgo from "react-timeago";

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
  const [bugPost, setBugPost] = React.useState([]);
  const [suggestionPost, setSuggestionPost] = React.useState([]);

  const getPost = (type) => {
    return fetch(BASE_URL + "/get_post/" + type).then((r) => r.json());
  };

  React.useEffect(() => {
    getPost("reported_post").then((data) => {
      if (data.success) {
        setRepotedPost(data.posts);
      }
    });
    getPost("bug").then((data) => {
      if (data.success) {
        setBugPost(data.posts);
      }
    });
    getPost("suggestion").then((data) => {
      if (data.success) {
        setSuggestionPost(data.posts);
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
      key: "deletePostMessage",
    });
    if (action === "ignore_post") {
      let post_data = {
        reported_post_type: reported_post_type,
        reported_post_id: reported_post_id,
      };
      fetch(`${BASE_URL}/admin/ignore_report/${post_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${props.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post_data),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            message.success({
              content: data.message,
              key: "deletePostMessage",
            });
            getPost("reported_post").then((d) => {
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
          headers: { Authorization: `Bearer ${props.access_token}` },
        }
      )
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            message.loading({
              content: "Post deleted. Deleting reported entry.",
              duration: 0,
              key: "deletePostMessage",
            });
            fetch(`${BASE_URL}/admin/delete_post/reported_post/${post_id}`, {
              method: "POST",
              headers: { Authorization: `Bearer ${props.access_token}` },
            })
              .then((r) => r.json())
              .then((data) => {
                if (data.success) {
                  message.success({
                    content: data.message,
                    key: "deletePostMessage",
                  });
                  getPost("reported_post").then((d) => {
                    if (d.success) {
                      setRepotedPost(d.posts);
                    }
                  });
                } else {
                  message.error({
                    content: data.message,
                    key: "deletePostMessage",
                  });
                }
              });
          } else {
            message.error({ content: data.message, key: "deletePostMessage" });
          }
        });
    }
  };

  const handleAdminReply = (post_type, post_id, post_reply) => {
    message.loading({
      content: "Action in progress...",
      duration: 0,
      key: "adminReplyMessage",
    });
    fetch(`${BASE_URL}/admin/reply_post/${post_type}/${post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.access_token}`,
      },
      body: JSON.stringify({ post_reply: post_reply }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          message.success({ content: data.message, key: "adminReplyMessage" });
        } else {
          message.error({ content: data.message, key: "adminReplyMessage" });
        }
      });
  };

  const handleDelete = (post_type, post_id) => {
    message.loading({
      content: "Action in progress...",
      duration: 0,
      key: "handleDelete",
    });
    fetch(`${BASE_URL}/admin/delete_post/${post_type}/${post_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${props.access_token}`,
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          message.success({ content: data.message, key: "handleDelete" });
        } else {
          message.error({ content: data.message, key: "handleDelete" });
        }
      });
  };

  const showAdminReplyModal = (item) => {
    Modal.confirm({
      title: `Reply to ${item.post_type["S"]} message`,
      content: (
        <div>
          <p>User Message:</p>
          <p>{item.post_content["S"]}</p>
          <Input
            id="admin_reply_message"
            placeholder="Admin Reply"
            defaultValue={isEmpty(item.post_reply) ? "" : item.post_reply["S"]}
          />
        </div>
      ),
      centered: true,
      okText: "Reply",
      cancelText: "Cancel",
      onOk() {
        handleAdminReply(
          item.post_type["S"],
          item.post_id["S"],
          document.getElementById("admin_reply_message").value
        );
      },
    });
  };

  const postSelector = (post_type) => {
    if (post_type.indexOf("fanart") > 0) {
      return "fanart";
    }
    return "post";
  };

  return (
    <div>
      <SecondaryLayout title="Admin Dashboard">
        <div className="admin_area">
          <Link href="/admin/story">
            <a>
              <Button
                size="large"
                type="primary"
                style={{ margin: "0 0 32px 32px" }}
              >
                Add Story
              </Button>
            </a>
          </Link>
          <Row gutter={[0, 32]}>
            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 9, offset: 1 }}>
              <Card title="Reported Post">
                <List
                  itemLayout="horizontal"
                  dataSource={reportedPost}
                  renderItem={(item) => (
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
                          <DeleteOutlined title="Delete Post" />
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
                          <CloseOutlined title="Ignore Report" />
                        </Popconfirm>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Link
                            href={`/${postSelector(
                              item.reported_post_type["S"]
                            )}/${item.reported_post_type["S"]}/${
                              item.reported_post_id["S"]
                            }`}
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
                  <Card title="Bugs">
                    <div className="card_content_area">
                      <List
                        itemLayout="horizontal"
                        dataSource={bugPost}
                        renderItem={(item) => (
                          <List.Item
                            actions={[
                              <MessageOutlined
                                title="Reply"
                                onClick={() => showAdminReplyModal(item)}
                              />,
                              <Popconfirm
                                title="Confirm Delete"
                                okText="Ok"
                                cancelText="No"
                                onConfirm={() =>
                                  handleDelete(
                                    item.post_type["S"],
                                    item.post_id["S"]
                                  )
                                }
                              >
                                <DeleteOutlined title="Delete" />
                              </Popconfirm>,
                            ]}
                          >
                            <List.Item.Meta
                              title={item.post_content["S"]}
                              description={
                                <TimeAgo date={item.post_date["S"]} />
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </Card>
                </Col>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 2 }}>
                  <Card title="Suggestions">
                    <div className="card_content_area">
                      <List
                        itemLayout="horizontal"
                        dataSource={suggestionPost}
                        renderItem={(item) => (
                          <List.Item
                            actions={[
                              <MessageOutlined
                                title="Reply"
                                onClick={() => showAdminReplyModal(item)}
                              />,
                              <Popconfirm
                                title="Confirm Delete"
                                okText="Ok"
                                cancelText="No"
                                onConfirm={() =>
                                  handleDelete(
                                    item.post_type["S"],
                                    item.post_id["S"]
                                  )
                                }
                              >
                                <DeleteOutlined title="Delete" />
                              </Popconfirm>,
                            ]}
                          >
                            <List.Item.Meta
                              title={item.post_content["S"]}
                              description={
                                <TimeAgo date={item.post_date["S"]} />
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </Card>
                </Col>
              </Row>
              <Row gutter={[0, 32]}>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                  <Card title="Help Needed">
                    <div className="card_content_area"></div>
                  </Card>
                </Col>
                <Col xs={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 2 }}>
                  <Card title="Currently Working On">
                    <div className="card_content_area"></div>
                  </Card>
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
          .card_content_area {
            height: 288px;
            max-height: 288px;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { access_token } = cookies(context);
  const r1 = await fetch(BASE_URL + "/admin/identity_check", {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const result = await r1.json();
  if (result.success) {
    return { props: { authorized: true, access_token: access_token } };
  }
  return { props: { authorized: false } };
}

export default Dashboard;
