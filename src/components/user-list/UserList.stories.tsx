import type { Meta, StoryObj } from '@storybook/react';

import { UserList } from './UserList';

const meta: Meta<typeof UserList> = { component: UserList };
export default meta;

type Story = StoryObj<typeof UserList>;

export const Primary: Story = {
  args: {
    data: [
      {
        user_id: 'alice',
        name: 'Alice',
      },
      {
        user_id: 'bob',
        name: 'Bob',
      },
      {
        user_id: 'charlie',
        name: 'Charlie',
      },
    ],
  },
};

export const Empty: Story = {};