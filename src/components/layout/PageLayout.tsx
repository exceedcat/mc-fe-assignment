import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { FC, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { defaultSelectedKeys, menuItems } from './menu-items';
import './page-layout.css';

const { Header, Sider, Content } = Layout;

export const PageLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { pathname } = useLocation();
  const key = pathname.split('/')[1];

  const onBreakpoint = (value) => {
    setCollapsed(value);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={onBreakpoint}
        onCollapse={setCollapsed}
        collapsedWidth="0"
        className="sider"
        style={{ background: colorBgContainer }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={key ? [key] : defaultSelectedKeys}
          items={menuItems}
          onSelect={() => setCollapsed(true)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={`menu-btn ${collapsed ? '' : 'menu-btn-right'}`}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
