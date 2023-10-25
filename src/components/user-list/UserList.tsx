import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

type UserData = {
  user_id: string;
  name: string;
  password?: string;
};

interface Props {
  data: Array<UserData>;
}

const columns: ColumnsType<UserData> = [
  {
    title: 'Id',
    dataIndex: 'username',
    sorter: (a, b) => a.username - b.username,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name - b.name,
  },
];

// todo: implement sorting
const onChange = console.log;

export const UserList: FC<Props> = ({ data }) => (
  <Table rowKey="username" columns={columns} dataSource={data} onChange={onChange} />
);
