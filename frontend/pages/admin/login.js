import Router from "next/router";

import { Row, Col, Card, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ReCAPTCHA from "react-google-recaptcha";

import { motion } from "framer-motion";
import fetch from "isomorphic-unfetch";

import SecondaryLayout from "../../components/SecondaryLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

let formValues;
let response;

function LoginForm() {
  const recaptchaInstance = React.useRef();

  const executeCaptcha = (values) => {
    formValues = values;
    recaptchaInstance.current.execute();
  };

  const handleFormSubmit = () => {
    formValues["g-recaptcha-response"] = response;
    fetch(BASE_URL + "/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) {
          message.error({ content: data.message });
        } else {
          document.cookie = `access_token=${data.access_token}; path=/admin`;
          Router.replace("/admin/dashboard");
        }
      });
  };

  const verifyCaptcha = () => {
    response = recaptchaInstance.current.getValue();
    if (response) {
      handleFormSubmit();
    }
  };

  return (
    <div>
      <SecondaryLayout title="Admin Login">
        <motion.div
          initial={{ opaity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="admin_login">
            <Row>
              <Col
                xs={{ span: 22, offset: 1 }}
                md={{ span: 12, offset: 6 }}
                lg={{ span: 8, offset: 8 }}
              >
                <Card style={{ boxShadow: "8px 8px 32px 0px rgba(0,0,0,0.5)" }}>
                  <Form onFinish={executeCaptcha}>
                    <Form.Item
                      name="username"
                      rules={[
                        { required: true, message: "Please input username" },
                      ]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Please input password" },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                      />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Log in
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        </motion.div>
        <ReCAPTCHA
          ref={recaptchaInstance}
          sitekey="6LeWVukUAAAAAK0uVPEuSOXo16450MgzzrhM9HDt"
          onChange={verifyCaptcha}
          size="invisible"
          theme="dark"
          badge="inline"
          style={{ display: "none" }}
        />
      </SecondaryLayout>
      <style jsx>
        {`
          .admin_login {
            margin-top: 64px;
          }
        `}
      </style>
    </div>
  );
}

export default LoginForm;
