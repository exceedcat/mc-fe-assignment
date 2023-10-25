import { Spin, Typography } from 'antd';
import { FC } from 'react';

import { UserList } from '../../components/user-list/UserList';

import { Status, useGetData } from '../../hooks/useGetData';
import { UserDTO, useUserAPI } from '../../hooks/useUserApi';

const { Title } = Typography;

export const UsersPage: FC = () => {
  const { getAll } = useUserAPI();
  const { data = [], status } = useGetData<never, UserDTO[]>({ query: getAll });

  if (status === Status.Error) return 'Error';
  return (
    <Spin spinning={status === Status.Loading} delay={500}>
      <Title>Users</Title>
      <UserList data={data} />
    </Spin>
  );
};
