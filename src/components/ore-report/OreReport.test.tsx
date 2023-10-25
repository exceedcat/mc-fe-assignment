import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { OreReport } from './OreReport';
import { OreAcquisition } from '../../hooks/useAqcuisitionsApi';
import { ReportView } from './consts';

const mockData: Array<OreAcquisition> = [
  {
    timestamp: 1695308855,
    date: new Date('2023-10-25T12:00:00'),
    ore_sites: 10,
  },
  {
    timestamp: 1695308855,
    date: new Date('2023-10-25T13:00:00'),
    ore_sites: 15,
  },
];

describe('OreReport', () => {
  it('renders Empty component when data is empty', () => {
    render(<OreReport view="Table" data={[]} />);

    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('renders a table when view is "Table"', () => {
    render(<OreReport view={ReportView.Table} data={mockData} />);

    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Ore Sites')).toBeInTheDocument();

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });
});
