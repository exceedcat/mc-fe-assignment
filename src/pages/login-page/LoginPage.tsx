import { Layout, Typography, theme, Alert } from 'antd';
import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { LoginForm } from '../../components/login-form/LoginForm';

import { useAuth } from '../../hooks/useAuth';

const { Title } = Typography;
const { Header, Content } = Layout;

export const LoginPage: FC = () => {
  const { logIn, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (values) => {
    setLoading(true);
    setAlertMessage('');

    const ok = await logIn(values);
    setLoading(false);

    if (!ok) {
      setAlertMessage('Something went wrong, please check you entered correct username and password.');
    }
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ padding: 0, background: colorBgContainer }} />
      <Content
        style={{
          margin: '24px auto',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          maxWidth: 'calc(100vw - 24px)',
          width: 600,
        }}
      >
        <Title>Sign In</Title>
        {alertMessage && <Alert message={alertMessage} type="error" />}
        <LoginForm onSubmit={handleSubmit} isLoading={loading} />
      </Content>
    </Layout>
  );
};
