import localforage from 'localforage';
import { useEffect, useState } from 'react';

interface LogInData {
  username: string;
  password: string;
}

interface AuthData {
  username: string;
  token: string;
}

interface Returned extends AuthData {
  isAuthenticated: boolean;
  logIn(data: LogInData): Promise<boolean>;
  logOut(): Promise<void>;
}

const AUTH_KEY = 'user';

const setAuth = async (data: AuthData | null) => {
  try {
    await localforage.setItem(AUTH_KEY, data);
  } catch (e) {
    console.log(e);
  }
};
export const getAuth = async (): Promise<AuthData | null> => {
  try {
    return localforage.getItem(AUTH_KEY);
  } catch (e) {
    console.log(e);
  }

  return null;
};

export const useAuth = (): Returned => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  const updateAuth = async (data = null) => {
    await setAuth(data);
    setToken(data?.token);
    setUsername(data?.username);
  };

  useEffect(() => {
    const getUserData = async () => {
      const data = await getAuth();
      updateAuth(data);
    };

    getUserData();
  }, []);

  const logOut = () => updateAuth(null);
  const logIn = async ({ username, password }: LogInData): Promise<boolean> => {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/token`, {
        method: 'POST',
        body: JSON.stringify({ user_id: username, password: password }),
      });
      if (!result.ok) {
        return false;
      }
      const resultData = await result.json();

      if (!resultData.access) {
        return false;
      }

      await updateAuth({
        token: resultData.access,
        username: username,
      });

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  };

  return {
    isAuthenticated: username && token,
    username,
    token,
    logIn,
    logOut,
  };
};
