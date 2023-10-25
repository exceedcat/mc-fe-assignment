import { Typography } from 'antd';
import { FC } from 'react';

import { UserList } from '../../components/user-list/UserList';
import { useUserAPI } from '../../hooks/useUserApi';
import { Status, useGetData } from '../../hooks/useGetData';

const { Title } = Typography;

export const UsersPage: FC = () => {
  const { getAll } = useUserAPI();
  const { data, status } = useGetData({ query: getAll })

  if (status === Status.Error) return 'Error';
  if (status  === Status.Loading) return 'Loading...';

  return (
    <>
      <Title>Users</Title>
      <UserList data={data} />
    </>
  );
};
