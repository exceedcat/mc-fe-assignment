import { Typography, Tabs, DatePickerProps, DatePicker } from 'antd';
import type { TabsProps } from 'antd';
import { FC, useEffect, useState } from 'react';

import { OreReport, ReportView } from '../../components/ore-report/OreReport';

import { useReportData } from './useReportData';

const { Title } = Typography;

export const ReportPage: FC = () => {
  const { getOreData } = useReportData();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(ReportView.Table);

  useEffect(() => {
    setIsLoading(true);
    const getReport = async () => {
      const { data, error } = await getOreData();
      if (error) setError(error);
      const value = data.map(d => ({...d, date: new Date(d.timestamp * 1000 )}))
      setData(value);
      setFilteredData(value);
      setIsLoading(false);
    };

    getReport();
  }, [getOreData]);

  if (error) return 'Error';
  if (isLoading) return 'Loading...';

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!date) {
      setFilteredData(data);
      return;
    }
    const starOfMonth = new Date(dateString);
    const year = starOfMonth.getFullYear(), month = starOfMonth.getMonth();
    const filtered = data.filter(v => v.date.getFullYear() === year && v.date.getMonth() === month)

    setFilteredData(filtered)
  };

  const items: TabsProps['items'] = [
    {
      key: ReportView.Table,
      label: 'Table',
      children: <OreReport data={filteredData} view={ReportView.Table} />,
    },
    {
      key: ReportView.Plot,
      label: 'Plot',
      children: <OreReport data={filteredData} view={ReportView.Plot} />,
    },
  ];

  return (
    <>
      <Title>Report</Title>
      <DatePicker onChange={onChange} picker="month" />
      <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
    </>
  );
};
