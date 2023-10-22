import { Button, Form, Input } from 'antd';
import { FC } from 'react';

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
};

interface Props {
  userData: {
    user_id: string;
    name: string;
    password?: string;
  };
}

export const UserForm: FC<Props> = ({ userData }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values, userData);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      name="profile"
      form={form}
      initialValues={userData}
      requiredMark="optional"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      layout="vertical"
    >
      <Form.Item<FieldType> label="Id" name="user_id" rules={[{ required: true, message: 'Please input your id!' }]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType> label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="New password"
        name="new_password"
        help="Leave the field empty if you do not want to change your password"
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
