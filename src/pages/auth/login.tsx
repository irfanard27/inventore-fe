import { Button, Card, Form, Input, message } from "antd";
import { AuthLayout } from "../../components/layouts/auth-layout";
import { useLoginMutation } from "@/redux/api-service/auth-service";
import type { LoginRequest } from "@/interface/auth";
import { useEffect } from "react";

export function Login() {
  const [form] = Form.useForm();
  const [_login, { isLoading }] = useLoginMutation();

  const onFinish = (values: LoginRequest) => {
    _login(values)
      .unwrap()
      .then(() => {
        message.success("Login successful", 0.5, () => {
          window.location.replace("/");
        });
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      email: "test@mail.com",
      password: "test1234",
    });
  }, []);

  return (
    <AuthLayout>
      <Card
        title="Login with your account"
        style={{ width: 360 }}
        variant="borderless"
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </AuthLayout>
  );
}
