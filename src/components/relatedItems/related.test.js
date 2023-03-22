/* eslint-disable react/react-in-jsx-scope */
import { render } from '../../store/test-utils.js';
import RelatedItems from './relatedItems';

/* network error since server isn't running, will prob. move to App */
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
