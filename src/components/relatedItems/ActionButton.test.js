/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { render, fireEvent, screen } from '../../store/test-utils.js';
import ActionButton from './ActionButton';

test('renders action button for related products', () => {
  render(<ActionButton product={{}} />);
  expect(screen.getByAltText('Action Button')).toBeInTheDocument();
});

test('renders action button for outfit products', () => {
  render(<ActionButton product={{}} related={false} />);
  expect(screen.getByTestId('action-button-outfit')).toBeInTheDocument();
});

test('opens comparison modal on click for related products', () => {
  render(<ActionButton product={{}} />);
  fireEvent.click(screen.getByAltText('Action Button'));
  expect(screen.getByTestId('comparison-modal')).toBeInTheDocument();
});

test('removes outfit product on click for outfit products', () => {
  const mockProduct = { id: 1, name: 'Test Product' };
  const { store } = render(<ActionButton product={mockProduct} related={false} />);
  fireEvent.click(screen.getByTestId('action-button-outfit'));
  expect(store.getState().overview.outfits).not.toContain(mockProduct);
});
