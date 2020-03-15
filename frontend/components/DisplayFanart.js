import Router from "next/router";
import Link from "next/link";

import fetch from "isomorphic-unfetch";
import TimeAgo from "react-timeago";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";
import isEmpty from "is-empty";

import { Card, Typography, Modal, Input, Alert, message } from "antd";
import { EditOutlined, DeleteOutlined, FlagOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function DisplayFanart(props) {
  /*if (!isEmpty(props.post_content)) {
    const options = {
      inlineStyles: {
        HIGHLIGHT: {
          style: { backgroundColor: "#ff0" }
        },
        STRIKETHROUGH: {
          style: { textDecoration: "line-through" }
        }
      },
      blockStyleFn: block => {
        const blockType = block.get("type");
        if (
          blockType === "unordered-list-item" ||
          blockType === "ordered-list-item"
        ) {
          return {
            style: {
              marginLeft: 24
            }
          };
        } else if (blockType === "blockquote") {
          return {
            style: {
              padding: 8,
              fontStyle: "italic",
              borderLeft: "4px solid rgba(192, 192, 192, 1)"
            }
          };
        }
      },
      entityStyleFn: entity => {
        const entityType = entity.get("type");
        if (entityType === "IMAGE") {
          const data = entity.getData();
          return {
            element: "img",
            attributes: {
              src: data.src
            },
            style: {
              maxWidth: "90%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }
          };
        }
      }
    };

    display = ReactHtmlParser(
      stateToHTML(convertFromRaw(JSON.parse(props.post_content)), options)
    );
  } else if (!isEmpty(props.post_image)) {*/
  let img_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4572/fanart.ronweasley.co"
      : "http://fanart.ronweasley.co";
  /*const display = (
    <div>
      {props.post_image.map((img, index) => (
        <div key={index}>
          <img
            alt="image"
            src={`${img_url}/${props.post_type}/${props.post_id}/${img["S"]}`}
            style={{
              maxWidth: "90%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "64px"
            }}
          />
        </div>
      ))}
    </div>
  );*/
  //}

  const handleEditPost = (post_secret, post_type, post_id) => {
    //if (post_type.indexOf("fanart") > 0) {
    return message.error({
      content:
        "Fanart edit not supported. To edit, delete current post and make a new one.",
      duration: 5
    });
    //}
    /*message.loading({
      content: "Action in progress",
      duration: 0,
      key: "handleEditMessage"
    });
    let post_data = {
      post_secret: post_secret
    };
    fetch(`${BASE_URL}/edit_post/${post_type}/${post_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post_data)
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          message.success({ content: data.message, key: "handleEditMessage" });
          document.cookie = `${post_id}=${data.access_token}; path=/`;
          Router.push(
            "/edit_post/[post_type]/[post_id]",
            `/edit_post/${post_type}/${post_id}`
          );
        } else {
          message.error({ content: data.message, key: "handleEditMessage" });
        }
      });*/
  };

  const showEditConfirm = () => {
    confirm({
      title: "Edit Post.",
      content: (
        <span>
          <p>Post secret is required to edit post.</p>
          <Input.Password
            placeholder="Post Secret"
            id="edit_input_post_secret"
          />
        </span>
      ),
      centered: true,
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        handleEditPost(
          document.getElementById("edit_input_post_secret").value,
          props.post_type,
          props.post_id
        );
      }
    });
  };

  const [deleteAlertDisplay, setDeleteAlertDisplay] = React.useState("none");

  const handleDeletePost = (post_secret, post_type, post_id) => {
    message.loading({
      content: "Action in progress",
      duration: 0,
      key: "handleDeleteMessage"
    });
    let post_data = {
      post_secret: post_secret
    };
    fetch(`${BASE_URL}/delete_post/${post_type}/${post_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post_data)
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          message.success({
            content: data.message,
            key: "handleDeleteMessage"
          });
          setDeleteAlertDisplay("block");
        } else {
          message.error({
            content: data.message,
            key: "handleDeleteMessage"
          });
        }
      });
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this post?",
      content: (
        <span>
          <p>This action is irrerversable. You need to enter post secret.</p>
          <Input.Password
            placeholder="Post Secret"
            id="delete_input_post_secret"
          />
        </span>
      ),
      centered: true,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeletePost(
          document.getElementById("delete_input_post_secret").value,
          props.post_type,
          props.post_id
        );
      }
    });
  };

  const [reportAlertDisplay, setReportAlertDisplay] = React.useState(
    props.post_reported ? "block" : "none"
  );

  const handleReportPost = (reported_post_reason, post_type, post_id) => {
    message.loading({
      content: "Action in progress",
      duration: 0,
      key: "handleReportMessage"
    });
    let post_data = {
      reported_post_reason: reported_post_reason
    };
    fetch(`${BASE_URL}/report_post/${post_type}/${post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(post_data)
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          message.success({
            content: data.message,
            key: "handleReportMessage"
          });
          setReportAlertDisplay("block");
        } else {
          message.error({
            content: data.message,
            key: "handleReportMessage"
          });
        }
      });
  };

  const showReportConfirm = () => {
    confirm({
      title: "Do you want to report this post?",
      content: (
        <span>
          <Input placeholder="Reason" id="input_post_report_reason" />
        </span>
      ),
      centered: true,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleReportPost(
          document.getElementById("input_post_report_reason").value,
          props.post_type,
          props.post_id
        );
      }
    });
  };

  const actions = [
    <EditOutlined title="Edit Post" onClick={showEditConfirm} />,
    <DeleteOutlined title="Delete Post" onClick={showDeleteConfirm} />,
    <FlagOutlined title="Report Post" onClick={showReportConfirm} />
  ];

  /*const post_url =
    props.post_type.indexOf("fanart") > 0
      ? "/fanart/[post_type]/[post_id]"
      : "/post/[post_type]/[post_id]";

  const post_as =
    props.post_type.indexOf("fanart") > 0
      ? `/fanart/${props.post_type}/${props.post_id}`
      : `/post/${props.post_type}/${props.post_id}`;*/

  return (
    <div>
      <div className="alert_div">
        <Alert
          message="Deleted"
          description="This post has been deleted."
          type="error"
          showIcon
        />
      </div>
      <div className="reported_div">
        <Alert
          message="Reported"
          description="This post has been reported."
          type="warning"
          showIcon
        />
      </div>
      <div className="display_post_card">
        {/*<Card
          bordered={props.bordered}
          type={props.inner ? "inner" : null}
          title={
            <span>
              <Link
                href="/fanart/[post_type]/[post_id]"
                as={`/fanart/${props.post_type}/${props.post_id}`}
              >
                <a>
                  <Typography.Paragraph
                    strong
                    ellipsis={{ rows: 1, expandable: true }}
                    style={{ fontSize: 16 }}
                  >
                    {props.post_title}
                  </Typography.Paragraph>
                </a>
              </Link>
              <Typography.Text type="secondary">
                Author:{" "}
                <a
                  href={props.post_author_link}
                  rel="noopener noreferrer"
                  style={{ color: "inherit", fontWeight: "bold" }}
                >
                  {props.post_author}
                </a>
              </Typography.Text>
            </span>
          }
          extra={<TimeAgo date={props.post_date} />}
          actions={props.showActions ? actions : null}
        >
          <div>{display}</div>
        </Card>*/}
        <Card
          bordered={props.bordered}
          actions={props.showActions ? actions : null}
          cover={
            <img
              alt={props.post_title}
              src={
                isEmpty(props.post_image)
                  ? null
                  : `${img_url}/${props.post_type}/${props.post_id}/${props.post_image[0]["S"]}`
              }
              width="100%"
              height="400px"
            />
          }
          extra={<TimeAgo date={props.post_date} />}
        >
          <Card.Meta
            title={props.post_title}
          />
        </Card>
      </div>
      <style jsx global>
        {`
          p {
            font-size: 22px;
          }
        `}
      </style>
      <style jsx>
        {`
          .alert_div {
            margin: 0 0 32px 0;
            display: ${deleteAlertDisplay};
          }
          .reported_div {
            margin-bottom: 32px;
            display: ${reportAlertDisplay};
          }
          .display_post_card {
            margin-bottom: 48px;
            box-shadow: 8px 14px 38px rgba(40, 40, 40, 0.1);
          }
        `}
      </style>
    </div>
  );
}

export default DisplayFanart;
