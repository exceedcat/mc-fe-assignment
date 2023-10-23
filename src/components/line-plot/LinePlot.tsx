import { Line } from '@ant-design/plots';
import { FC } from 'react';

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

  return <Line {...config} />;
};
