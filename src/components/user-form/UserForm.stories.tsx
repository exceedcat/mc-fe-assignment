import type { Meta, StoryObj } from '@storybook/react';

import { UserForm } from './UserForm';

const meta: Meta<typeof UserForm> = { component: UserForm };
export default meta;

type Story = StoryObj<typeof UserForm>;

export const Filled: Story = { args: { userData: { user_id: 'charlie', name: 'Charlie', password: '1234' }} };

export const Empty: Story = {};