import type { Meta, StoryObj } from '@storybook/react';

import { OreReport, ReportView } from './OreReport';

const meta: Meta<typeof OreReport> = { component: OreReport };
export default meta;

type Story = StoryObj<typeof OreReport>;

export const Table: Story = {
  args: {
    view: ReportView.Table,
    data: [
      {
        timestamp: 1695308855,
        ore_sites: 8,
      },
      {
        timestamp: 1696392088,
        ore_sites: 18,
      },
      {
        timestamp: 1697272320,
        ore_sites: 36,
      },
    ],
  },
};
export const Plot: Story = {
  args: {
    view: ReportView.Plot,
    data: [
      {
        timestamp: 1695308855,
        ore_sites: 8,
      },
      {
        timestamp: 1696392088,
        ore_sites: 18,
      },
      {
        timestamp: 1697272320,
        ore_sites: 36,
      },
    ],
  },
};

export const EmptyTable: Story = {};
export const EmptyPlot: Story = { args: { view: ReportView.Plot }};
