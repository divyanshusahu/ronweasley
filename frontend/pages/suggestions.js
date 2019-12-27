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
  Avatar
} from "antd";

import SecondaryLayout from "../components/SecondaryLayout";

function Suggestions() {
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : "https://api.ronweasley.co";

  const [bugs, setBugs] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);
  const [feedbacks, setFeedbacks] = React.useState([]);

  React.useEffect(() => {
    fetch(BASE_URL + "/suggestions/get/suggestion")
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setSuggestions(data.posts);
        }
      });

    fetch(BASE_URL + "/suggestions/get/feedback")
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setFeedbacks(data.posts);
        }
      });
  }, []);

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
              >
                <Collapse bordered={true}>
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
              ></Card>
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
                    placeholder="Report Bug here"
                    addonAfter={<Icon type="enter" />}
                  />
                ]}
              ></Card>
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
                    placeholder="Enter suggestions here"
                    addonAfter={<Icon type="enter" />}
                  />
                ]}
              >
                {suggestions.map(sug => (
                  <Comment
                    content={sug.content["S"]}
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
                    {isEmpty(sug.reply) ? null : (
                      <Comment
                        content={sug.reply["S"]}
                        author="Admin"
                        datetime={sug.reply_time["S"]}
                        avatar={
                          <Avatar
                            icon="user"
                            style={{ backgroundColor: "#52c41a" }}
                          />
                        }
                      />
                    )}
                  </Comment>
                ))}
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
                    placeholder="Leave feedback here"
                    addonAfter={<Icon type="enter" />}
                  />
                ]}
              >
                {feedbacks.map(fed => (
                  <Comment
                    content={fed.content["S"]}
                    datetime={<TimeAgo date={fed.post_date["S"]} />}
                    key={fed.post_id["S"]}
                    author="Anon"
                    avatar={<Avatar icon="user" />}
                  />
                ))}
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
        `}
      </style>
    </div>
  );
}

export default Suggestions;
