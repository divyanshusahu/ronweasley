import Router from "next/router";

import { Row, Col, Card, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import fetch from "isomorphic-unfetch";

import SecondaryLayout from "../../components/SecondaryLayout";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://api.ronweasley.co";

function LoginForm(props) {
  const handleFormSubmit = event => {
    event.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        fetch(BASE_URL + "/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        })
          .then(r => r.json())
          .then(data => {
            if (!data.success) {
              message.error({ content: data.message });
            } else {
              document.cookie = `access_token=${data.access_token}; path=/admin`;
              Router.replace("/admin/dashboard");
            }
          });
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <div>
      <SecondaryLayout title="Admin Login">
        <div className="admin_login">
          <Row>
            <Col
              xs={{ span: 22, offset: 1 }}
              md={{ span: 12, offset: 6 }}
              lg={{ span: 8, offset: 8 }}
            >
              <Card>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Item>
                    {getFieldDecorator("username", {
                      rules: [
                        { required: true, message: "Please input username" }
                      ]
                    })(
                      <Input prefix={<UserOutlined />} placeholder="Username" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator("password", {
                      rules: [
                        { required: true, message: "Please input password" }
                      ]
                    })(
                      <Input.Password
                        prefix={<LockOutlined />}
                        placeholder="Password"
                      />
                    )}
                  </Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Log in
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
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

const AdminLogin = Form.create({ name: "admin_login" })(LoginForm);

export default AdminLogin;
