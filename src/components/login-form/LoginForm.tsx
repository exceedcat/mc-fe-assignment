import { Button, Form, Input } from 'antd';
import { FC } from 'react';

type FieldType = {
  username?: string;
  password?: string;
};

interface Props {
  onSubmit: (data: Record<FieldType, string>) => void;
  isLoading: boolean;
}

export const LoginForm: FC<Props> = ({ onSubmit, isLoading }) => (
  <Form name="login" requiredMark="optional" onFinish={onSubmit} autoComplete="on" layout="vertical">
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Submit
      </Button>
    </Form.Item>
  </Form>
);
