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
    dataIndex: 'user_id',
    sorter: (a, b) => a.user_id - b.user_id,
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
  <Table rowKey="user_id" columns={columns} dataSource={data} onChange={onChange} />
);
