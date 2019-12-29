import { Card, Typography, Icon } from "antd";

import TimeAgo from "react-timeago";
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import ReactHtmlParser from "react-html-parser";

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
            marginLeft: "5%"
          }
        };
      }
    }
  };

  const postHtml = ReactHtmlParser(
    stateToHTML(convertFromRaw(JSON.parse(props.post_content)), options)
  );

  return (
    <div>
      <div className="display_post_card">
        <Card
          type={props.inner ? "inner" : null}
          title={
            <span>
              <a href={`/post/${props.post_type}/${props.post_id}`}>
                <Typography.Paragraph
                  strong
                  ellipsis={{ rows: 1, expandable: true }}
                  style={{ fontSize: 18 }}
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
          actions={[
            <Icon type="edit" title="Edit Post" />,
            <Icon type="delete" title="Delete Post" />,
            <Icon type="flag" title="Report Post" />
          ]}
        >
          <div>{postHtml}</div>
        </Card>
      </div>
      <style jsx>
        {`
          .display_post_card {
            margin-bottom: 48px;
          }
        `}
      </style>
    </div>
  );
}

export default DisplayPost;
