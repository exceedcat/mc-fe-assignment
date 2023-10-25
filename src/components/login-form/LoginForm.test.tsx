import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, describe } from 'vitest';
import { vi } from 'vitest';

import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders the login form', () => {
    render(<LoginForm onSubmit={vi.fn()} isLoading={false} />);

    // Check if the form and its fields are rendered correctly
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} isLoading={false} />);

    // Simulate user interaction: filling in the input fields and submitting the form
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(usernameInput, { target: { value: 'john_doe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    await userEvent.click(submitButton);

    // Check if the onSubmit function was called with the form data
    expect(onSubmit).toHaveBeenCalledWith({
      username: 'john_doe',
      password: 'password123',
    });
  });

  it('displays validation errors on form submission with empty fields', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} isLoading={false} />);

    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    // Check if validation error messages are displayed for required fields
    await screen.findByText('Please input your username!');
    await screen.findByText('Please input your password!');
  });

});