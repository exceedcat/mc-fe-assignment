import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

export const WelcomePage: FC = () => {
  const { username, logOut } = useAuth();

  if (!username) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <p>Welcome {username}!</p>
      <button type="button" onClick={logOut}>
        Log out
      </button>
    </div>
  );
};
