import { render, screen} from '../../store/test-utils';
import Questions from '../questions/questions';
import React from 'react';



describe('QuestionsAnswers', () => {
  test('renders the title', () => {
    const { getByText } = render(<Questions />);
    const titleElement = getByText(/QUESTIONS & ANSWERS/i);
    expect(titleElement).toBeInTheDocument();
  });


});