import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactForm } from '../ContactForm';

describe('ContactForm', () => {
  it('shows validation errors for empty or invalid fields', async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByTestId('submit-btn');
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Имя должно содержать минимум 2 символа')).toBeInTheDocument();
    expect(await screen.findByText('Введите корректный email-адрес')).toBeInTheDocument();
    expect(await screen.findByText('Сообщение должно содержать минимум 10 символов')).toBeInTheDocument();
  });

  it('validates email format correctly', async () => {
    render(<ContactForm />);

    const nameInput = screen.getByTestId('input-name');
    const emailInput = screen.getByTestId('input-email');
    const messageInput = screen.getByTestId('input-message');
    const submitBtn = screen.getByTestId('submit-btn');

    fireEvent.change(nameInput, { target: { value: 'Ivan' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(messageInput, { target: { value: 'Hello world, this is a test message.' } });

    fireEvent.click(submitBtn);

    expect(await screen.findByText('Введите корректный email-адрес')).toBeInTheDocument();
    expect(screen.queryByText('Имя должно содержать минимум 2 символа')).not.toBeInTheDocument();
    expect(screen.queryByText('Сообщение должно содержать минимум 10 символов')).not.toBeInTheDocument();
  });

  it('submits successfully and shows success state', async () => {
    render(<ContactForm />);

    const nameInput = screen.getByTestId('input-name');
    const emailInput = screen.getByTestId('input-email');
    const messageInput = screen.getByTestId('input-message');
    const submitBtn = screen.getByTestId('submit-btn');

    fireEvent.change(nameInput, { target: { value: 'Ivan' } });
    fireEvent.change(emailInput, { target: { value: 'ivan@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello world, this is a test message.' } });

    fireEvent.click(submitBtn);

    // Check loading state
    expect(submitBtn).toBeDisabled();

    // Check success state after fake timeout
    await waitFor(() => {
      expect(screen.getByTestId('contact-success')).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
