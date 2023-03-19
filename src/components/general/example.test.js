/* eslint-disable react/react-in-jsx-scope */
// import { render, screen } from '@testing-library/react';
import { render } from '../../../test-utils.js';

import RelatedItems from '../relatedItems/relatedItems';
import Questions from '../questions/questions';


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
});


describe('QuestionsAnswers', () => {
  test('renders the title', () => {
    const { getByText } = render(<Questions />);
    const titleElement = getByText(/QUESTIONS/i);
    expect(titleElement).toBeInTheDocument();
  });


});