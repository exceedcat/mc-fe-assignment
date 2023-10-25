import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import { UserDTO } from '../../hooks/useUserApi';

interface Props {
  data: Array<UserDTO>;
}

const columns: ColumnsType<UserDTO> = [
  {
    title: 'Username',
    dataIndex: 'user_id',
    sorter: (a, b) => a.username.localeCompare(b.username),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
];

export const UserList: FC<Props> = ({ data }) => <Table rowKey="user_id" columns={columns} dataSource={data} />;
