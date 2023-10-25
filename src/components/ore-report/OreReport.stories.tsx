import type { Meta, StoryObj } from '@storybook/react';

import { OreReport } from './OreReport';
import { ReportView } from './consts';

const meta: Meta<typeof OreReport> = { component: OreReport };
export default meta;

type Story = StoryObj<typeof OreReport>;

const commonArgs = {
  data: [
    {
      timestamp: 1695308855,
      date: new Date(1695308855 * 1000),
      ore_sites: 8,
    },
    {
      timestamp: 1696392088,
      date: new Date(1696392088 * 1000),
      ore_sites: 18,
    },
    {
      timestamp: 1697272320,
      date: new Date(1697272320 * 1000),
      ore_sites: 36,
    },
  ],
};
export const Table: Story = {
  args: {
    ...commonArgs,
    view: ReportView.Table,
  },
};
export const Plot: Story = {
  args: {
    ...commonArgs,
    view: ReportView.Plot,
  },
};

export const EmptyTable: Story = {};
export const EmptyPlot: Story = { args: { view: ReportView.Plot } };
