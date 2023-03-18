// import { screen } from '@testing-library/react';
import Overview from '../overview/overview';
import React from 'react';
import { render, screen} from './test-utils.js';

describe('Overview Testing', () => {
  test('renders the title', () => {
    const { getByText } = render(<Overview />);
    const titleElement = getByText(/OVERVIEW/i);
    expect(titleElement).toBeInTheDocument();
  });
});