import Router from "next/router";

import TimeAgo from "react-timeago";
import isEmpty from "is-empty";
import LazyLoad from "react-lazyload";

import { Card, Modal, Input, Alert, Typography, Image, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FlagOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import {
  handleEditPost,
  handleDeletePost,
  handleReportPost,
} from "../hooks/postActionsUtils";
import parseHtml from "../hooks/parseHtml";

const { confirm } = Modal;

function DisplayFanart(props) {
  let img_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4572/fanart.ronweasley.co"
      : "https://fanart.ronweasley.co";

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
              "/edit_fanart/[post_type]/[post_id]",
              `/edit_fanart/${props.post_type}/${props.post_id}`
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

  const cover_url = isEmpty(props.post_image)
    ? null
    : `${img_url}/${props.post_type}/${props.post_id}/${props.post_image[0]["S"]}`;

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
          actions={props.showActions ? actions : null}
          title={
            props.is_layout ? null : (
              <span>
                <Typography.Title style={{ fontSize: 18, overflowX: "auto" }}>
                  {props.post_title}
                </Typography.Title>
                <Typography.Title
                  level={2}
                  style={{
                    fontSize: 14,
                    marginBottom: "0",
                    marginTop: "0",
                    fontWeight: "500",
                    color: "rgba(0,0,0,0.65)",
                  }}
                >
                  Artist:{" "}
                  <a
                    href={props.post_author_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#096dd9" }}
                  >
                    {props.post_author}
                  </a>
                </Typography.Title>
              </span>
            )
          }
          cover={
            props.is_layout ? (
              <div
                className={
                  "show_image_background" +
                  (props.post_nsfw ? " nsfw_filter" : "")
                }
              ></div>
            ) : null
          }
          extra={<TimeAgo date={props.post_date} />}
          actions={props.showActions ? actions : null}
        >
          {props.is_layout ? (
            <Card.Meta
              title={props.post_title}
              description={`Artist: ${props.post_author}`}
            />
          ) : null}
          {props.is_layout ? null : (
            <div>
              {props.post_image.map((img, index) => (
                <LazyLoad
                  key={index}
                  height="100%"
                  placeholder={<Card loading={true} />}
                  once
                >
                  <div key={index}>
                    <Image
                      alt={`${props.post_title} by ${props.post_author}`}
                      src={`${img_url}/${props.post_type}/${props.post_id}/${img["S"]}`}
                      style={{
                        display: "block",
                        margin: "32px 0 32px 0",
                      }}
                      placeholder={true}
                    />
                  </div>
                </LazyLoad>
              ))}
            </div>
          )}
          {props.is_layout ? null : (
            <div className="art_description">
              {isEmpty(props.post_description)
                ? null
                : parseHtml(props.post_description)}
            </div>
          )}
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
          .art_description {
            font-size: 16px;
            font-family: "Open Sans";
          }
          .show_image_background {
            width: 100%;
            height: 400px;
            background-image: url(${cover_url});
            background-size: cover;
          }
          .nsfw_filter {
            filter: blur(32px);
            opacity: 0.4;
          }
        `}
      </style>
    </div>
  );
}

export default DisplayFanart;
