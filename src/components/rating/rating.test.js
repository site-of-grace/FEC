import { render, screen } from '@testing-library/react';
import Rating from './rating.jsx';
import React from 'react';
describe('Rating', () => {
  test('renders the title', () => {
    const { getByText } = render(<Rating />);
    const titleElement = getByText(/RATING/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('applies the correct CSS class to the title', () => {
    const { getByText } = render(<Rating />);
    const titleElement = getByText(/RATING/i);
    expect(titleElement).toHaveClass('title');
  });
});