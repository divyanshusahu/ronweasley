import TimeAgo from "react-timeago";
import isEmpty from "is-empty";

import { Card, Modal, Input, Alert, Typography, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FlagOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import getHTMLFromDraftJS from "../hooks/getHTMLFromDraftJS";
import {
  handleEditFanart,
  handleDeletePost,
  handleReportPost,
} from "../hooks/postActionsUtils";

const { confirm } = Modal;

function DisplayFanart(props) {
  let img_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:4572/fanart.ronweasley.co"
      : "http://fanart.ronweasley.co";

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
        let result = handleEditFanart(
          document.getElementById("edit_input_post_secret").value,
          props.post_type,
          props.post_id
        );
        if (!result.success) {
          return message.error({
            content:
              "Fanart edit not supported. To edit, delete current post and make a new one.",
            duration: 5,
          });
        }
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
                <Typography.Paragraph strong style={{ fontSize: 18 }}>
                  {props.post_title}
                </Typography.Paragraph>
                <Typography.Text type="secondary" style={{ fontSize: 14 }}>
                  Artist:{" "}
                  <a
                    href={props.post_author_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.post_author}
                  </a>
                </Typography.Text>
              </span>
            )
          }
          cover={
            props.is_layout ? (
              <div className="show_image_background"></div>
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
                <div key={index}>
                  <img
                    alt="image"
                    src={`${img_url}/${props.post_type}/${props.post_id}/${img["S"]}`}
                    style={{
                      maxWidth: "90%",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "64px",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {props.is_layout ? null : (
            <div className="art_description">
              {isEmpty(props.post_description)
                ? null
                : getHTMLFromDraftJS(props.post_description)}
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
            box-shadow: 8px 14px 38px rgba(40, 40, 40, 0.1);
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
        `}
      </style>
    </div>
  );
}

export default DisplayFanart;
