import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const menuItems = [
  {
    key: 'Home',
    icon: <UploadOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: 'Report',
    icon: <UploadOutlined />,
    label: <Link to="/report">Report</Link>,
  },
  {
    type: 'divider',
  },
  {
    key: 'Profile',
    icon: <UserOutlined />,
    label: <Link to="/profile">Profile</Link>,
  },
  {
    key: 'Users',
    icon: <VideoCameraOutlined />,
    label: <Link to="/users">Users</Link>,
  },
];
export const defaultSelectedKeys = ['Home']