import { Empty, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

import { OreAcquisition } from '../../hooks/useAqcuisitionsApi';

import { LinePlot } from '../line-plot/LinePlot';
import { ReportView } from './consts';

interface Props {
  data: Array<OreAcquisition>;
  view: ReportView;
}

const getFromDate = (type: 'day' | 'time', date: Date) => {
  const [day, time] = date.toLocaleString().split(', ');
  return type === 'day' ? day : time;
};

const columns: ColumnsType<OreAcquisition> = [
  {
    title: 'Date',
    dataIndex: 'date',
    render: (value) => getFromDate('day', value),
  },
  {
    title: 'Time',
    dataIndex: 'date',
    render: (value) => getFromDate('time', value),
  },
  {
    title: 'Ore Sites',
    dataIndex: 'ore_sites',
  },
];

export const OreReport: FC<Props> = ({ view = ReportView.Table, data }) => {
  if (!data || !data.length) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  const plotData: Record<string, string | number>[] = data.map((item) => ({
    ...item,
    date: item.date.toLocaleString(),
  }));
  if (view === ReportView.Table) return <Table rowKey="timestamp" columns={columns} dataSource={data} />;
  if (view === ReportView.Plot) return <LinePlot data={plotData} xField="date" yField="ore_sites" />;
};
