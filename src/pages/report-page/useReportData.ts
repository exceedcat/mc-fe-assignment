import { useCallback } from 'react';

import { useAuth } from '../../hooks/useAuth';

export const useReportData = () => {
  const { token } = useAuth();

  const getOreData = useCallback(async () => {
    if (!token) return { error: false, data: [] };
    try {
      const result = await fetch(`${import.meta.env.VITE_API_URL}/acquisitions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!result.ok) {
        return { error: true, data: null };
      }
      const resultData = await result.json();

      return { error: false, data: resultData.sort((a,b) => a.timestamp - b.timestamp) };
    } catch (e) {
      console.log(e);
      return { error: true, data: null };
    }
  }, [token]);

  return {
    getOreData,
  };
};
