import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe } from 'vitest';
import { vi } from 'vitest';

import { UserDTO } from '../../hooks/useUserApi';

import { UserForm } from './UserForm';

describe('UserForm', () => {
  const user: UserDTO = {
    user_id: 'jd',
    name: 'John Doe',
  };

  it('renders the form with initial data', () => {
    render(<UserForm userData={user} onSubmit={vi.fn()} isLoading={false} />);

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
  });

  it('submits the form with updated data', async () => {
    const onSubmit = vi.fn();
    console.log(onSubmit);
    render(<UserForm userData={user} onSubmit={onSubmit} isLoading={false} />);

    const nameInput = screen.getByLabelText('Name');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    await userEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Updated Name',
    });
  });

  it('resets the form', async () => {
    render(<UserForm userData={user} onSubmit={vi.fn()} isLoading={false} />);

    const nameInput = screen.getByLabelText('Name');
    const resetButton = screen.getByText('Reset');

    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });
    await userEvent.click(resetButton);

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
  });
});
