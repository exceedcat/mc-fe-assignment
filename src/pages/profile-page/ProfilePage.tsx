import { Alert, message, Spin, Typography } from 'antd';
import { FC, useEffect } from 'react';

import { UserForm } from '../../components/user-form/UserForm';

import { useAuth } from '../../hooks/useAuth';
import { Status, useGetData } from '../../hooks/useGetData';
import { UserWithPasswordDTO, useUserAPI } from '../../hooks/useUserApi';

const { Title } = Typography;

export const ProfilePage: FC = () => {
  const { username } = useAuth();
  const { getById, updateById } = useUserAPI();
  const { data: userData, status: userDataStatus } = useGetData({
    query: getById,
    data: username as never,
    enabled: !!username,
  });
  const { status: updateUserDataStatus, run: updateUserData } = useGetData({
    query: updateById,
    manualRun: true,
  });
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (updateUserDataStatus === Status.Success)
      messageApi.open({
        type: 'success',
        content: 'Profile data updated successfully',
      });
  }, [messageApi, updateUserDataStatus]);

  if (userDataStatus === Status.Error) return 'Error';

  const handleSubmit = async (values) => {
    const data: UserWithPasswordDTO = {
      user_id: userData.user_id,
      name: values.name,
      password: values.newPassword || userData.password,
    };

    await updateUserData?.(data as never);
  };

  return (
    <Spin spinning={userDataStatus === Status.Loading} delay={500}>
      {contextHolder}
      <Title>Profile</Title>
      {updateUserDataStatus === Status.Error && (
        <Alert message="Something went wrong, please check you entered correct data." type="error" />
      )}
      <UserForm userData={userData} onSubmit={handleSubmit} isLoading={updateUserDataStatus === Status.Loading} />
    </Spin>
  );
};
