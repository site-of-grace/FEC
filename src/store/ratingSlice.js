import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  ratingMeta: {},
  reviewPage: 0,
  reviewsHelpful: [],
  reviewsRecent: []
};


const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
    setRatingMeta: (state, action) => {
      state.ratingMeta = action.payload;
    },
    setReviewPage: (state, action) => {
      state.reviewPage = action.payload;
    },
    setReviewsHelpful: (state, action) => {
      state.reviewsHelpful = action.payload;
    },
    setReviewsRecent: (state, action) => {
      state.reviewsRecent = action.payload;
    }
  }
});

export const {setReviews, setRatingMeta, setReviewPage, setReviewsHelpful, setReviewsRecent} = ratingSlice.actions;

export default ratingSlice.reducer;