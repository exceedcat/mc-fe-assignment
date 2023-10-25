import { Alert, Typography, message } from 'antd';
import { FC, useState } from 'react';

import { UserForm } from '../../components/user-form/UserForm';

import { useUserData } from './useUserData';

const { Title } = Typography;

export const ProfilePage: FC = () => {
  const {
    data: userData,
    isLoading: isUserDataLoading,
    error,
    updateUser,
  } = useUserData({ initialGetData: true });
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [messageApi, contextHolder] = message.useMessage();


  if (error) return 'Error';
  if (isUserDataLoading || !userData) return 'Loading...';

  const handleSubmit = async (values) => {
    setIsFormLoading(true);
    setAlertMessage('');

    const data = {
      username: userData.user_id,
      name: userData.name,
      password: values.newPassword || userData.password,
    }

    const ok = await updateUser(data);
    setIsFormLoading(false);

    if (!ok) {
      setAlertMessage('Something went wrong, please check you entered correct data.');
    } else {
      messageApi.open({
        type: 'success',
        content: 'Profile data updated successfully',
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Title>Profile</Title>
      {alertMessage && <Alert message={alertMessage} type="error" />}
      <UserForm userData={userData} onSubmit={handleSubmit} isLoading={isUserDataLoading || isFormLoading} />
    </>
  );
};
