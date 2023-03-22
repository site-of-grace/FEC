/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from '../../store/test-utils.js';
import CardCarousel from './CardCarousel';

// mock the cardItems prop
const cardItems = [
  { id: 'card1', url: 'https://example.com/card1.jpg' },
  { id: 'card2', url: 'https://example.com/card2.jpg' },
  { id: 'card3', url: 'https://example.com/card3.jpg' },
  { id: 'card4', url: 'https://example.com/card4.jpg' }
];

// mock the changePhoto prop
const changePhoto = jest.fn();

// mock the onMouseEnter and onMouseLeave props
const onMouseEnter = jest.fn();
const onMouseLeave = jest.fn();

// let getByAlt;

describe('CardCarousel', () => {
  // render the component before each test
  beforeEach(() => {
    render(
      <CardCarousel
        show={true}
        cardItems={cardItems}
        changePhoto={changePhoto}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  });

  // reset the mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the CardCarousel', () => {
   let { container } = render(
      <CardCarousel
        show={true}
        cardItems={cardItems}
      />
    );
    const carouselElement = container.getElementsByClassName('card-carousel');
    expect((carouselElement).length).toBe(1);
  });

  it('calls changePhoto function with correct argument when a card is clicked', () => {
    const fourthCard = screen.getByAltText('card4');
    fireEvent.click(fourthCard);
    expect(changePhoto).toHaveBeenCalledWith('https://example.com/card4.jpg');
  });

  // test that the component renders four cards with correct images and classes
  test('renders four cards with correct images and classes', () => {
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(4);
    expect(cards[0]).toHaveClass('carousel-card active');
    expect(cards[1]).toHaveClass('carousel-card next');
    expect(cards[2]).toHaveClass('carousel-card last');
    expect(cards[3]).toHaveClass('carousel-card prev');
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);
    expect(images[0]).toHaveAttribute('src', cardItems[0].url);
    expect(images[1]).toHaveAttribute('src', cardItems[1].url);
    expect(images[2]).toHaveAttribute('src', cardItems[2].url);
    expect(images[3]).toHaveAttribute('src', cardItems[3].url);
  });

  // test that clicking on the next card cycles the cards forward and calls changePhoto with correct url
  test('clicking on the next card cycles the cards forward and calls changePhoto with correct url', () => {
    const nextCard = screen.getByRole('img', { name: /card2/i });
    fireEvent.click(nextCard);
    // [2, 3, 0, 1] -> [3, 0, 1, 2]
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(4);
    expect(cards[0]).toHaveClass('carousel-card prev');
    expect(cards[1]).toHaveClass('carousel-card active');
    expect(cards[2]).toHaveClass('carousel-card next');
    expect(cards[3]).toHaveClass('carousel-card last');

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);
  });

    // test that clicking on the next card cycles the cards forward and calls changePhoto with correct url
    test('clicking on the next card cycles the cards backwards and calls changePhoto with correct url', () => {
      const nextCard = screen.getByRole('img', { name: /card1/i });
      fireEvent.click(nextCard);
      // [2, 3, 0, 1] -> [1, 2, 3, 0]
      const cards = screen.getAllByRole('listitem');
      expect(cards).toHaveLength(4);
      expect(cards[0]).toHaveClass('carousel-card next');
      expect(cards[1]).toHaveClass('carousel-card last');
      expect(cards[2]).toHaveClass('carousel-card prev');
      expect(cards[3]).toHaveClass('carousel-card active');
  
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(4);
    });
});
