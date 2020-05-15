import Router from "next/router";
//import Link from "next/link";

import TimeAgo from "react-timeago";
//import isEmpty from "is-empty";
import ReactHtmlParser from "react-html-parser";

import { Card, Typography, Modal, Input, Alert, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FlagOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

//import getHTMLFromDraftJS from "../hooks/getHTMLFromDraftJS";
import {
  handleEditPost,
  handleDeletePost,
  handleReportPost,
} from "../hooks/postActionsUtils";

const { confirm } = Modal;

function DisplayPost(props) {
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
      icon: <ExclamationCircleOutlined />,
      onOk() {
        message.loading({
          content: "Action in progress",
          duration: 0,
          key: "handleEditMessage",
        });
        handleEditPost(
          document.getElementById("edit_input_post_secret").value,
          props.post_type,
          props.post_id
        ).then((data) => {
          if (data.success) {
            message.success({
              content: data.message,
              key: "handleEditMessage",
            });
            document.cookie = `${props.post_id}=${data.access_token}; path=/`;
            Router.push(
              "/edit_post/[post_type]/[post_id]",
              `/edit_post/${props.post_type}/${props.post_id}`
            );
          } else {
            message.error({ content: data.message, key: "handleEditMessage" });
          }
        });
      },
    });
  };

  const [deleteAlertDisplay, setDeleteAlertDisplay] = React.useState("none");

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
      icon: <ExclamationCircleOutlined />,
      onOk() {
        message.loading({
          content: "Action in progress",
          duration: 0,
          key: "handleDeleteMessage",
        });
        handleDeletePost(
          document.getElementById("delete_input_post_secret").value,
          props.post_type,
          props.post_id
        ).then((data) => {
          if (data.success) {
            message.success({
              content: data.message,
              key: "handleDeleteMessage",
            });
            setDeleteAlertDisplay("block");
          } else {
            message.error({
              content: data.message,
              key: "handleDeleteMessage",
            });
          }
        });
      },
    });
  };

  const [reportAlertDisplay, setReportAlertDisplay] = React.useState(
    props.post_reported ? "block" : "none"
  );

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
      icon: <ExclamationCircleOutlined />,
      onOk() {
        message.loading({
          content: "Action in progress",
          duration: 0,
          key: "handleReportMessage",
        });
        handleReportPost(
          document.getElementById("input_post_report_reason").value,
          props.post_type,
          props.post_id
        ).then((data) => {
          if (data.success) {
            message.success({
              content: data.message,
              key: "handleReportMessage",
            });
            setReportAlertDisplay("block");
          } else {
            message.error({
              content: data.message,
              key: "handleReportMessage",
            });
          }
        });
      },
    });
  };

  const actions = [
    <EditOutlined title="Edit Post" onClick={showEditConfirm} />,
    <DeleteOutlined title="Delete Post" onClick={showDeleteConfirm} />,
    <FlagOutlined title="Report Post" onClick={showReportConfirm} />,
  ];

  const post_url =
    props.post_type.indexOf("fanart") > 0
      ? "/fanart/[post_type]/[post_id]"
      : "/post/[post_type]/[post_id]";

  const post_as =
    props.post_type.indexOf("fanart") > 0
      ? `/fanart/${props.post_type}/${props.post_id}`
      : `/post/${props.post_type}/${props.post_id}`;

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
        <Card
          bordered={props.bordered}
          type={props.inner ? "inner" : null}
          title={
            <span>
              <Typography.Paragraph strong style={{ fontSize: 18 }}>
                {props.post_title}
              </Typography.Paragraph>
              <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                Author:{" "}
                <a
                  href={props.post_author_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {props.post_author}
                </a>
              </Typography.Text>
            </span>
          }
          extra={<TimeAgo date={props.post_date} />}
          actions={props.showActions ? actions : null}
        >
          {/*
            <div className="post_text">
              {isEmpty(props.post_summary)
                ? getHTMLFromDraftJS(props.post_content)
                : getHTMLFromDraftJS(props.post_summary)}
            </div>
              */}
          {/*isEmpty(props.post_summary) ? null : (
            <div style={{ float: "right" }}>
              <Link href={post_url} as={post_as} scroll={false}>
                <a>View</a>
              </Link>
            </div>
          )*/}
          {
            <div className="post_text">
              {ReactHtmlParser(props.post_content)}
            </div>
          }
        </Card>
      </div>
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
          }
          .post_text {
            font-size: 16px;
            font-family: "Open Sans";
            color: rgba(0, 0, 0, 0.75);
          }
        `}
      </style>
    </div>
  );
}

// box-shadow: 8px 14px 38px rgba(40, 40, 40, 0.1);

export default DisplayPost;
