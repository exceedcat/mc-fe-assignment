import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const menuItems = [
  {
    key: 'home',
    icon: <UploadOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: 'report',
    icon: <UploadOutlined />,
    label: <Link to="/report">Report</Link>,
  },
  {
    type: 'divider',
  },
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: <Link to="/profile">Profile</Link>,
  },
  {
    key: 'users',
    icon: <VideoCameraOutlined />,
    label: <Link to="/users">Users</Link>,
  },
];
export const defaultSelectedKeys = ['Home'];
