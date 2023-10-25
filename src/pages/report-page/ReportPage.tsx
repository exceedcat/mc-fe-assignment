import type { TabsProps } from 'antd';
import { DatePicker, DatePickerProps, Spin, Tabs, Typography } from 'antd';
import { FC, useEffect, useState } from 'react';

import { OreReport } from '../../components/ore-report/OreReport';
import { ReportView } from '../../components/ore-report/consts';

import { OreAcquisition, useAqcuisitionsApi } from '../../hooks/useAqcuisitionsApi';
import { Status, useGetData } from '../../hooks/useGetData';

const { Title } = Typography;

export const ReportPage: FC = () => {
  const { getAll } = useAqcuisitionsApi();
  const { data = [], status } = useGetData<never, OreAcquisition[]>({ query: getAll });
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState(ReportView.Table);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  if (status === Status.Error) return 'Error';

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (!date) {
      setFilteredData(data);
      return;
    }
    const starOfMonth = new Date(dateString);
    const year = starOfMonth.getFullYear(),
      month = starOfMonth.getMonth();
    const filtered = data.filter((v) => v.date.getFullYear() === year && v.date.getMonth() === month);

    setFilteredData(filtered);
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
    <Spin spinning={status === Status.Loading} delay={500}>
      <Title>Report</Title>
      <DatePicker onChange={onChange} picker="month" />
      <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
    </Spin>
  );
};
