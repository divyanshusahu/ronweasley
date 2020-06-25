import { Row, Col, Card } from "antd";

import SecondaryLayout from "./SecondaryLayout";

function LoadingComponent() {
  return (
    <SecondaryLayout title="Loading...">
        <div className="page_root">
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 14, offset: 5 }}
              xxl={{ span: 12, offset: 6 }}
            >
              <Card loading={true}></Card>
            </Col>
          </Row>
        </div>
      <style jsx>
        {`
          .page_root {
            margin: 64px 0 16px 0;
          }
        `}
      </style>
    </SecondaryLayout>
  );
}

export default LoadingComponent;
