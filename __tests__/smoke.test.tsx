import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Smoke Test', () => {
  it('renders a simple element to verify setup', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
