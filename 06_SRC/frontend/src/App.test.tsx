import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the main application with dashboard', () => {
    render(<App />);
    // App now renders the Router which shows the Dashboard page
    // Use the heading role to target the specific Dashboard title
    expect(screen.getByRole('heading', { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByText('Welcome to your Strata-AI dashboard.')).toBeInTheDocument();
  });
});
