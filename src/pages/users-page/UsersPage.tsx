import { Typography } from 'antd';
import { FC, useEffect, useState } from 'react';

import { UserList } from '../../components/user-list/UserList';

import { useUserData } from '../profile-page/useUserData';

const { Title } = Typography;

export const UsersPage: FC = () => {
  const { error, getAll } = useUserData({ initialGetData: false });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      const data = await getAll();
      setData(data);
      setIsLoading(false);
    };

    getUsers();
  }, [getAll]);

  if (error) return 'Error';
  if (isLoading) return 'Loading...';

  return (
    <>
      <Title>Users</Title>
      <UserList data={data} />
    </>
  );
};
