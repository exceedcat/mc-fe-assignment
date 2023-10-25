import { useCallback } from 'react';

import { useAuth } from './useAuth';

type AcquisitionDTO = {
  timestamp: number;
  ore_sites: number;
};

export type OreAcquisition = {
  date: Date;
  timestamp: number;
  ore_sites: number;
};

interface AcquisitionsApi {
  getAll: () => Promise<OreAcquisition[]>;
}

export const useAqcuisitionsApi = (): AcquisitionsApi => {
  const { token } = useAuth();

  const getAll = useCallback(async () => {
    if (!token) return;

    const result = await fetch(`${import.meta.env.VITE_API_URL}/acquisitions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!result.ok) {
      throw new Error(result.statusText);
    }
    const resultData: AcquisitionDTO[] = await result.json();

    return resultData
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((data) => ({
        timestamp: data.timestamp,
        ore_sites: data.ore_sites,
        date: new Date(data.timestamp * 1000),
      }));
  }, [token]);

  return {
    getAll,
  };
};
