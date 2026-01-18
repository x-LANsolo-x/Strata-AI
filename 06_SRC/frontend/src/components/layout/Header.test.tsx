import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './Header';

describe('Header', () => {
  it('renders user and notification icons', () => {
    render(<Header />);
    // The buttons are accessible by their presence, we find them by role.
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2); // Expect two buttons for Bell and User
  });
});
