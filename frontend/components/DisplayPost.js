import fetch from "isomorphic-unfetch";

import { Card, Typography, Icon, Modal, Input, Alert, message } from "antd";

const { confirm } = Modal;

import TimeAgo from "react-timeago";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function DisplayPost(props) {
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

  const postHtml = ReactHtmlParser(
    stateToHTML(convertFromRaw(JSON.parse(props.post_content)), options)
  );

  const [deleteAlertDisplay, setDeleteAlertDisplay] = React.useState("none");

  const handleDeletePost = (post_secret, post_type, post_id) => {
    message.loading({
      content: "Action in progress",
      duration: 0,
      key: "handleDeleteMessage"
    });
    const post_data = {
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
            duration: 1.5,
            key: "handleDeleteMessage"
          });
          setDeleteAlertDisplay("block");
        } else {
          message.error({
            content: data.message,
            duration: 1.5,
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
          <Input.Password placeholder="Post Secret" id="input_post_secret" />
        </span>
      ),
      centered: true,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeletePost(
          document.getElementById("input_post_secret").value,
          props.post_type,
          props.post_id
        );
      }
    });
  };

  const actions = [
    <Icon type="edit" title="Edit Post" />,
    <Icon type="delete" title="Delete Post" onClick={showDeleteConfirm} />,
    <Icon type="flag" title="Report Post" />
  ];

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
      <div className="display_post_card">
        <Card
          bordered={props.bordered}
          type={props.inner ? "inner" : null}
          title={
            <span>
              <a href={`/post/${props.post_type}/${props.post_id}`}>
                <Typography.Paragraph
                  strong
                  ellipsis={{ rows: 1, expandable: true }}
                  style={{ fontSize: 16 }}
                >
                  {props.post_title}
                </Typography.Paragraph>
              </a>
              <Typography.Text type="secondary">
                Author:{" "}
                <a href={props.post_author_link} rel="noopener noreferrer">
                  {props.post_author}
                </a>
              </Typography.Text>
            </span>
          }
          extra={<TimeAgo date={props.post_date} />}
          actions={props.showActions ? actions : null}
        >
          <div>{postHtml}</div>
        </Card>
      </div>
      <style jsx>
        {`
          .alert_div {
            margin: 0 0 32px 0;
            display: ${deleteAlertDisplay};
          }
          .display_post_card {
            margin-bottom: 48px;
          }
        `}
      </style>
    </div>
  );
}

export default DisplayPost;
