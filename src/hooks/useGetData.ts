import { useCallback, useEffect, useState } from 'react';

interface Props<T> {
  query: (...data: T) => Promise<never>;
  data?: T;
  manualRun?: boolean;
  enabled?: boolean;
}

export enum Status {
  NotStarted,
  Loading,
  Success,
  Error,
}

interface Returned<T> {
  data?: T;
  run?: (payload: never) => T;
  status: Status;
}

export const useGetData = ({ query, data, manualRun = false, enabled = true }: Props<never>): Returned<never> => {
  const [status, setStatus] = useState(Status.NotStarted);
  const [resultData, setResultData] = useState(null);

  const run = useCallback(async (payload: never) => {
    if (!enabled) return;
    setStatus(Status.Loading);
    try {
      const result = await query(payload);
      setResultData(result);
      setStatus(Status.Success);
    } catch (e) {
      setResultData(null);
      setStatus(Status.Error);
    }
  }, [enabled, query]);

  useEffect(() => {
    if (manualRun || !enabled) return;
    run(data);
  }, [data, enabled, manualRun, run]);


  return {
    data: resultData,
    status,
    ...(manualRun && { run }),
  };
};
