import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';

import { UserDTO } from '../../hooks/useUserApi';

import { UserList } from './UserList';

const sampleUserData: Array<UserDTO> = [
  {
    user_id: 'u1',
    name: 'User One',
  },
  {
    user_id: 'u2',
    name: 'User Two',
  },
];

describe('UserList', () => {
  it('renders the component with data', () => {
    render(<UserList data={sampleUserData} />);

    expect(screen.getByText('u1')).toBeInTheDocument();
    expect(screen.getByText('u2')).toBeInTheDocument();
    expect(screen.getByText('User One')).toBeInTheDocument();
    expect(screen.getByText('User Two')).toBeInTheDocument();
  });

  it('renders the component without data', () => {
    const { queryByText } = render(<UserList data={[]} />);

    expect(queryByText('u1')).toBeNull();
    expect(queryByText('u2')).toBeNull();
  });
});
