import { render, screen, fireEvent, waitFor} from '../../store/test-utils';

import Rating from './rating.jsx';
import ReviewList from './reviewList.jsx';

import React from 'react';
import { Provider } from 'react-redux';

import { useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import fakeReviewData from './utils/fakeReviewData.jsx';

const mockStore = configureStore([]);

describe('Rating Beginning Elements', () => {
  test('renders the main div', () => {
    render(<Rating />);
    const container = document.querySelector('#rating-main');
    expect(container).toBeInTheDocument();
  });

  test('renders Breakdown elements at start', () => {
    render(<Rating />);
    const container = document.getElementById('rating-breakdown');
    expect(container).toBeInTheDocument();
    const expectedChildren = ['rating-breakdown-title', 'rating-average', 'rating-starsAverage', 'rating-recommended', 'rating-attrBreakdown'];
    expectedChildren.forEach((childId) => {
      var element = document.getElementById(childId);
      expect(container.children).toContain(element);
    });
  });

  test('renders Review List elements at start', () => {
    render(<Rating />);
    const container = document.getElementById('review-list-section');
    expect(container).toBeInTheDocument();

    const sortOptions = document.getElementById('sort-bar');
    expect(container.children).toContain(sortOptions);
    const selector = document.getElementById('sort-options');
    expect(sortOptions.children).toContain(selector);

    const list = document.getElementById('review-list');
    expect(container.children).toContain(list);

    const addReview = document.getElementById('rating-add');
    expect(list.children).toContain(addReview);
  });
});

  describe('ReviewList', () => {
    test('renders a review when provided with a list of reviews', () => {

      const store = mockStore({ rating: { reviews: fakeReviewData } });

      const { getByText } = render(
        <Provider store={store}>
          <ReviewList />
        </Provider>
      );
    var review = document.getElementsByClassName('review')[0];
    expect(review).toBeInTheDocument();
    var expectedClasses = ['review-stars', 'review-date-name', 'review-summary', 'review-body', 'review-photo', 'review-response', 'review-helpful', 'review-star'];

    expectedClasses.forEach((curClass) => {
      const element = document.getElementsByClassName(curClass)[0];
      expect(element).toBeInTheDocument();
    });
  });
});

describe('Breakdown', () => {

});
