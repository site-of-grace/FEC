/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { render, screen } from '../../store/test-utils.js';
import { mockIntersectionObserver } from 'jsdom-testing-mocks'
import Carousel from './Carousel';

//mock intersection observer
mockIntersectionObserver();

// Mock the Card component to make testing simpler
jest.mock('./Card.jsx', () => {
  return jest.fn(() => <div data-testid="card" width="252"/>);
});

const mockItems = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
];

describe('Carousel', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Carousel items={mockItems} />);
    expect(screen.getAllByTestId('card')).toHaveLength(mockItems.length);
  });

});
