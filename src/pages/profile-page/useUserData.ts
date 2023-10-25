import { useEffect, useState } from 'react';

import { useAuth } from '../../hooks/useAuth';

interface Props {
  initialGetData: boolean;
}

interface Returned {
  data: any;
  isLoading: boolean;
  error: boolean;
  updateUser: (data: UserData) => Promise<boolean>;
}

type UserData = {
  username: string;
  name: string;
  password: string;
};

export const useUserData = ({ initialGetData = true }: Props): Returned => {
  const { username, token } = useAuth();
  const [isLoading, setIsLoading] = useState(initialGetData);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!initialGetData || !username) {
      setIsLoading(false);
      return;
    }

    const getData = async () => {
      setIsLoading(true);

      try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/users/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoading(false);
        setError(false);
        if (!result.ok) {
          return setData(null);
        }
        const resultData = await result.json();
        setData(resultData);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        setError(true);
        setData(null);
      }
    };

    getData();
  }, [initialGetData, username, token]);

  const updateUser = async (data: UserData) => {
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/users/${data.username}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: data.name, password: data.password }),
      });
      if (!result.ok) {
        return false;
      }
      const resultData = await result.json();
      setData(resultData);
      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  };

  return { data, isLoading, error, updateUser };
};
