import fetch from "isomorphic-unfetch";
import isEmpty from "is-empty";
import TimeAgo from "react-timeago";

import {
  Row,
  Col,
  Card,
  Typography,
  Collapse,
  Icon,
  Input,
  Comment,
  Avatar,
  Empty,
  message
} from "antd";

import SecondaryLayout from "../components/SecondaryLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function Suggestions({ pageLoadBugs, pageLoadSuggestions, pageLoadFeedbacks }) {
  const [bugs, setBugs] = React.useState(pageLoadBugs);
  const [suggestions, setSuggestions] = React.useState(pageLoadSuggestions);
  const [feedbacks, setFeedbacks] = React.useState(pageLoadFeedbacks);

  const [bugInputValue, setBugInputValue] = React.useState("");
  const [suggestionInputValue, setSuggestionInputValue] = React.useState("");
  const [feedbackInputValue, setFeedbackInputValue] = React.useState("");

  const refreshFeed = type => {
    fetch(BASE_URL + "/get_post/" + type)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          if (type === "bug") {
            setBugs(data.posts);
            setBugInputValue("");
          } else if (type === "suggestion") {
            setSuggestions(data.posts);
            setSuggestionInputValue("");
          } else if (type === "feedback") {
            setFeedbacks(data.posts);
            setFeedbackInputValue("");
          }
        }
      });
  };

  const post_user_feedback = type => {
    let post_data = {
      post_content: document.getElementById(`input-${type}`).value
    };
    message.loading({
      content: "Action in progress...",
      key: "handlePostMessage",
      duration: 0
    });
    fetch(BASE_URL + "/new_suggestion/" + type, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post_data)
    })
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          message.success({
            content: data.message,
            key: "handlePostMessage"
          });
          refreshFeed(type);
        } else {
          message.error({
            content: data.message,
            key: "handlePostMessage"
          });
        }
      });
  };

  return (
    <div>
      <SecondaryLayout title="Report Bugs, Suggestions and Feedabck">
        <div className="display_suggestions">
          <Row gutter={[0, 32]}>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 9, offset: 2 }}>
              <Card
                title={
                  <span>
                    <Typography.Title level={4}>Help Needed</Typography.Title>
                    <Typography.Text type="secondary">
                      Needed user suggestion for following issues
                    </Typography.Text>
                  </span>
                }
                extra={<Icon type="warning" style={{ fontSize: 20 }} />}
              >
                <div className="admin_feedback_card_content">
                  <Collapse bordered={false}>
                    <Collapse.Panel
                      header="Android, IOS App?"
                      key={1}
                      extra={
                        <div>
                          <Icon
                            type="like"
                            onClick={event => event.stopPropagation()}
                          />
                          <span style={{ paddingLeft: 8, paddingRight: 8 }}>
                            0
                          </span>
                          <Icon
                            type="dislike"
                            onClick={event => event.stopPropagation()}
                          />
                          <span style={{ paddingLeft: 8 }}>0</span>
                        </div>
                      }
                    >
                      <Typography.Text>
                        Is Android, IOS app needed?
                      </Typography.Text>
                    </Collapse.Panel>
                  </Collapse>
                </div>
              </Card>
            </Col>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 9, offset: 2 }}>
              <Card
                title={
                  <span>
                    <Typography.Title level={4}>
                      Currently Working on
                    </Typography.Title>
                    <Typography.Text type="secondary">
                      Current tasks admin is working on.
                    </Typography.Text>
                  </span>
                }
                extra={<Icon type="check-square" style={{ fontSize: 20 }} />}
              >
                <div className="admin_feedback_card_content">
                  <Empty />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="user_feedback">
          <Row gutter={[0, 32]}>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 6, offset: 2 }}>
              <Card
                title={
                  <span>
                    <Typography.Title level={4}>Report Bugs</Typography.Title>
                    <Typography.Text type="secondary">
                      Please report any bugs here
                    </Typography.Text>
                  </span>
                }
                extra={<Icon type="bug" style={{ fontSize: 20 }} />}
                actions={[
                  <Input
                    id="input-bug"
                    placeholder="Report Bug here"
                    addonAfter={
                      <Icon
                        type="enter"
                        onClick={() => post_user_feedback("bug")}
                      />
                    }
                    onPressEnter={() => post_user_feedback("bug")}
                    value={bugInputValue}
                    onChange={e => setBugInputValue(e.target.value)}
                  />
                ]}
              >
                <div className="user_feedback_card_content">
                  {isEmpty(bugs) ? (
                    <Empty />
                  ) : (
                    bugs.map(b => (
                      <Comment
                        content={b.post_content["S"]}
                        datetime={<TimeAgo date={b.post_date["S"]} />}
                        key={b.post_id["S"]}
                        author="Anon"
                        avatar={<Avatar icon="bug" />}
                      >
                        {isEmpty(b.post_reply) ? null : (
                          <Comment
                            content={b.post_reply["S"]}
                            author="Admin"
                            datetime={<TimeAgo date={b.post_reply_time["S"]} />}
                            avatar={
                              <Avatar
                                icon="user"
                                style={{ backgroundColor: "#52c41a" }}
                              />
                            }
                          />
                        )}
                      </Comment>
                    ))
                  )}
                </div>
              </Card>
            </Col>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }}>
              <Card
                title={
                  <span>
                    <Typography.Title level={4}>Suggestions</Typography.Title>
                    <Typography.Text type="secondary">
                      Enter suggestions for website here.
                    </Typography.Text>
                  </span>
                }
                extra={<Icon type="question-circle" style={{ fontSize: 20 }} />}
                actions={[
                  <Input
                    id="input-suggestion"
                    placeholder="Enter suggestions here"
                    addonAfter={
                      <Icon
                        type="enter"
                        onClick={() => post_user_feedback("suggestion")}
                      />
                    }
                    onPressEnter={() => post_user_feedback("suggestion")}
                    value={suggestionInputValue}
                    onChange={e => setSuggestionInputValue(e.target.value)}
                  />
                ]}
              >
                <div className="user_feedback_card_content">
                  {isEmpty(suggestions) ? (
                    <Empty />
                  ) : (
                    suggestions.map(sug => (
                      <Comment
                        content={sug.post_content["S"]}
                        datetime={<TimeAgo date={sug.post_date["S"]} />}
                        key={sug.post_id["S"]}
                        author="Anon"
                        avatar={
                          <Avatar
                            icon="user"
                            style={{ backgroundColor: "#f5222d" }}
                          />
                        }
                      >
                        {isEmpty(sug.post_reply) ? null : (
                          <Comment
                            content={sug.post_reply["S"]}
                            author="Admin"
                            datetime={
                              <TimeAgo date={sug.post_reply_time["S"]} />
                            }
                            avatar={
                              <Avatar
                                icon="user"
                                style={{ backgroundColor: "#52c41a" }}
                              />
                            }
                          />
                        )}
                      </Comment>
                    ))
                  )}
                </div>
              </Card>
            </Col>
            <Col xs={{ span: 22, offset: 1 }} md={{ span: 6, offset: 1 }}>
              <Card
                title={
                  <span>
                    <Typography.Title level={4}>Feedbacks</Typography.Title>
                    <Typography.Text type="secondary">
                      Like it? Hate it? Please leave a Feedabck.
                    </Typography.Text>
                  </span>
                }
                extra={
                  <Icon type="exclamation-circle" style={{ fontSize: 20 }} />
                }
                actions={[
                  <Input
                    id="input-feedback"
                    placeholder="Leave feedback here"
                    addonAfter={
                      <Icon
                        type="enter"
                        onClick={() => post_user_feedback("feedback")}
                      />
                    }
                    onPressEnter={() => post_user_feedback("feedback")}
                    value={feedbackInputValue}
                    onChange={e => setFeedbackInputValue(e.target.value)}
                  />
                ]}
              >
                <div className="user_feedback_card_content">
                  {isEmpty(feedbacks) ? (
                    <Empty />
                  ) : (
                    feedbacks.map(fed => (
                      <Comment
                        content={fed.post_content["S"]}
                        datetime={<TimeAgo date={fed.post_date["S"]} />}
                        key={fed.post_id["S"]}
                        author="Anon"
                        avatar={<Avatar icon="user" />}
                      />
                    ))
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </SecondaryLayout>
      <style jsx>
        {`
          .display_suggestions {
            margin-top: 64px;
          }
          .user_feedback {
            margin-top: 32px;
            margin-bottom: 48px;
          }
          .admin_feedback_card_content {
            height: 320px;
            max-height: 320px;
            overflow: auto;
          }
          .user_feedback_card_content {
            height: 280px;
            max-height: 280px;
            overflow: auto;
          }
        `}
      </style>
    </div>
  );
}

Suggestions.getInitialProps = async () => {
  const r1 = await fetch(BASE_URL + "/get_post/bug");
  let pageLoadBugs = await r1.json();
  if (pageLoadBugs.success) {
    pageLoadBugs = pageLoadBugs.posts;
  }

  const r2 = await fetch(BASE_URL + "/get_post/suggestion");
  let pageLoadSuggestions = await r2.json();
  if (pageLoadSuggestions.success) {
    pageLoadSuggestions = pageLoadSuggestions.posts;
  }

  const r3 = await fetch(BASE_URL + "/get_post/feedback");
  let pageLoadFeedbacks = await r3.json();
  if (pageLoadFeedbacks.success) {
    pageLoadFeedbacks = pageLoadFeedbacks.posts;
  }

  return {
    pageLoadBugs: pageLoadBugs,
    pageLoadSuggestions: pageLoadSuggestions,
    pageLoadFeedbacks: pageLoadFeedbacks
  };
};

export default Suggestions;
