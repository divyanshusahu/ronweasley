import { Row, Col, Card, Typography, Steps } from "antd";

import SecondaryLayout from "../components/SecondaryLayout";

const { Title } = Typography;

function WebsiteTimeline() {
  return (
    <SecondaryLayout title="Website Timeline">
      <div className="page_root">
        <Row>
          <Col
            xs={{ span: 22, offset: 1 }}
            md={{ span: 20, offset: 2 }}
            lg={{ span: 14, offset: 5 }}
            xxl={{ span: 12, offset: 6 }}
          >
            <Card
              title={
                <Title level={2} style={{ marginBottom: 0 }}>
                  Website Timeline
                </Title>
              }
              style={{
                boxShadow: "8px 14px 38px 0px rgba(40,40,40,0.1)",
              }}
            >
              <Steps
                direction="vertical"
                progressDot={false}
                current={9}
                status="finish"
              >
                <Steps.Step
                  title="January 30, 2020"
                  description="Work Started for the website."
                />
                <Steps.Step
                  title="April 5, 2020"
                  description="First Release."
                />
                <Steps.Step
                  title="April 15, 2020"
                  description="Fanfiction page added and Google Recaptcha implemented."
                />
                <Steps.Step
                  title="April 24, 2020"
                  description="Search Bar added and minor pagination bug fixed."
                />
                <Steps.Step
                  title="May 11, 2020"
                  description="Upload image support for editor implemented."
                />
                <Steps.Step
                  title="May 13, 2020"
                  description="Caching method optimized for smooth user experience."
                />
                <Steps.Step
                  title="May 16, 2020"
                  description="DraftJS replaced with TinyMCE. Beta support to edit fanart."
                />
                <Steps.Step
                  title="June 8, 2020"
                  description="Service worker added for offline support and fanarts are distributed over HTTPS."
                />
                <Steps.Step
                  title="June 25, 2020"
                  description="Design changed and page transition animations removed."
                />
                <Steps.Step
                  title="August 7, 2020"
                  description="NSFW filter added for fanarts and fanart description bug fixed."
                />
              </Steps>
            </Card>
          </Col>
        </Row>
      </div>
      <style jsx>
        {`
          .page_root {
            margin: 64px 0 64px 0;
          }
        `}
      </style>
    </SecondaryLayout>
  );
}

export default WebsiteTimeline;
