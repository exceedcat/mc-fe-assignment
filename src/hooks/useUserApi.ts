import { useCallback } from 'react';

import { useAuth } from './useAuth';

export type UserDTO = {
  user_id: string;
  name: string;
};

export type UserWithPasswordDTO = UserDTO & {
  password: string;
};

interface UserApi {
  getById: (id: string) => Promise<UserWithPasswordDTO>;
  updateById: (data: UserWithPasswordDTO) => Promise<UserWithPasswordDTO>;
  getAll: () => Promise<UserDTO[]>;
}

export const useUserAPI = (): UserApi => {
  const { token } = useAuth();

  const getById = useCallback(
    async (username) => {
      if (!token) return;
      const result = await fetch(`${import.meta.env.VITE_API_URL}/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!result.ok) {
        return null;
      }
      return result.json();
    },
    [token],
  );
  const getAll = useCallback(async () => {
    if (!token) return;

    const result = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!result.ok) {
      throw new Error(result.statusText);
    }
    const resultData = await result.json();

    return resultData.map((user) => ({ username: user.user_id, name: user.name }));
  }, [token]);

  const updateById = async ({ user_id, ...data }: UserWithPasswordDTO) => {
    if (!token) return;
    const result = await fetch(`${import.meta.env.VITE_API_URL}/users/${user_id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!result.ok) {
      return false;
    }
    return await result.json();
  };

  return {
    getById,
    updateById,
    getAll,
  };
};
