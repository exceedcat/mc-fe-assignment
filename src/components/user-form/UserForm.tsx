import { Button, Form, Input } from 'antd';
import { FC, useEffect } from 'react';

import { UserDTO } from '../../hooks/useUserApi';

type FieldType = {
  name?: string;
  password?: string;
};

type FormData = {
  name: string;
  newPassword?: string;
};

interface Props {
  userData: UserDTO | null;
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

export const UserForm: FC<Props> = ({ userData, onSubmit, isLoading }) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (!userData) return;
    form.setFieldsValue(userData);
  }, [form, userData]);

  return (
    <Form
      name="profile"
      form={form}
      initialValues={userData}
      requiredMark="optional"
      onFinish={onSubmit}
      autoComplete="on"
      layout="vertical"
    >
      <Form.Item<FieldType> label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="New password"
        name="newPassword"
        help="Leave the field empty if you do not want to change your password"
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} style={{ marginRight: 8 }}>
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};
