import { FC, lazy, Suspense } from 'react';

const Line = lazy(() => import('@ant-design/plots').then((module) => ({ default: module.Line })));

interface Props {
  data: Record<string, string | number>[];
  xField: string;
  yField: string;
}

export const LinePlot: FC<Props> = ({ data, xField, yField }) => {
  const config = {
    data,
    xField,
    yField,
    padding: 'auto',
    xAxis: {
      tickCount: 5,
    },
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Line {...config} />
    </Suspense>
  );
};
