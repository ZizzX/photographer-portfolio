import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Input } from '../input';

describe('Input Component', () => {
  it('renders correctly', () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText(/enter text/i);
    expect(input).toBeInTheDocument();
  });

  it('shows error message and applies error styles when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<Input error={errorMessage} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');

    const errorText = screen.getByRole('alert');
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent(errorMessage);
  });
});
