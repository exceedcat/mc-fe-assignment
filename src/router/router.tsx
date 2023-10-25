import { Button, Result } from 'antd';
import { createBrowserRouter, Link, redirect } from 'react-router-dom';

import { LoginPage } from '../pages/login-page/LoginPage';
import { ProfilePage } from '../pages/profile-page/ProfilePage';
import { WelcomePage } from '../pages/welcome-page/WelcomePage';

import { PageLayout } from '../components/layout/PageLayout';

import { getAuth } from '../hooks/useAuth';
import { UsersPage } from '../pages/users-page/UsersPage';
import { ReportPage } from '../pages/report-page/ReportPage';

async function loginLoader() {
  const authData = await getAuth();
  if (authData) {
    return redirect('/');
  }
  return null;
}

async function protectedLoader() {
  const authData = await getAuth();
  if (authData) {
    return null;
  }
  return redirect('/login');
}

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: PageLayout,
    errorElement: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    ),
    children: [
      {
        index: true,
        loader: protectedLoader,
        Component: WelcomePage,
      },
      {
        path: 'profile',
        loader: protectedLoader,
        Component: ProfilePage,
      },
      {
        path: 'users',
        loader: protectedLoader,
        Component: UsersPage,
      },
      {
        path: 'report',
        loader: protectedLoader,
        Component: ReportPage,
      },
    ],
  },
  {
    path: 'login',
    loader: loginLoader,
    Component: LoginPage,
  },
]);
