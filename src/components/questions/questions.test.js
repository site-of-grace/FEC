import { render, screen} from '../../../test-utils.js';
import Questions from './questions.jsx';


describe('QuestionsAnswers', () => {
  test('renders the title', () => {
    const { getByText } = render(<Questions />);
    const titleElement = getByText(/QUESTIONS & ANSWERS/i);
    expect(titleElement).toBeInTheDocument();
  });


});