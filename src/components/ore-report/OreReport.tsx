import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';
import { LinePlot } from '../line-plot/LinePlot';

interface OreReportData {
  timestamp: number;
  ore_sites: number;
}

export enum ReportView {
  Table,
  Plot,
}

interface Props {
  data: Array<OreReportData>;
  view: ReportView;
}

const getFromTimestamp = (type: 'date' | 'time', timestamp: string) => {
  const [date, time] = new Date(timestamp).toLocaleString().split(', ');
  return type === 'date' ? date : time;
};

const columns: ColumnsType<OreReportData> = [
  {
    title: 'Date',
    dataIndex: 'timestamp',
    render: (value) => getFromTimestamp('date', value),
  },
  {
    title: 'Time',
    dataIndex: 'timestamp',
    render: (value) => getFromTimestamp('time', value),
  },
  {
    title: 'Ore Sites',
    dataIndex: 'ore_sites',
  },
];

export const OreReport: FC<Props> = ({ view = ReportView.Table, data }) => {
  const plotData: Record<string, string | number>[] = data.map((item) => ({
    ...item,
    timestamp: new Date(item.timestamp).toLocaleString(),
  }));
  if (view === ReportView.Table) return <Table rowKey="timestamp" columns={columns} dataSource={data} />;
  if (view === ReportView.Plot) return <LinePlot data={plotData} xField="timestamp" yField="ore_sites" />;
};
