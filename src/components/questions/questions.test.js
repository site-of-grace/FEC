import { render } from '@testing-library/react';
import Questions from '../questions/questions';


describe('QuestionsAnswers', () => {
  test('renders the title', () => {
    const { getByText } = render(<Questions />);
    const titleElement = getByText(/QUESTIONS & ANSWERS/i);
    expect(titleElement).toBeInTheDocument();
  });


});