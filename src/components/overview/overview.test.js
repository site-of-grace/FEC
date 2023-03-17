import { render, screen } from '@testing-library/react';
import RelatedItems from '../relatedItems/relatedItems';

describe('RelatedItems', () => {
  test('renders the title', () => {
    const { getByText } = render(<RelatedItems />);
    const titleElement = getByText(/RELATED ITEMS/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('applies the correct CSS class to the title', () => {
    const { getByText } = render(<RelatedItems />);
    const titleElement = getByText(/RELATED ITEMS/i);
    expect(titleElement).toHaveClass('title');
  });

  test('testing', () => {
    const { getByText } = render(<RelatedItems />);
    const titleElement = getByText(/RELATED ITEMS/i);
    expect(titleElement).toHaveClass('title');
  });
});