import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  ratingMeta: {},
  reviewsRelevant: [],
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
    setReviewsHelpful: (state, action) => {
      state.reviewsHelpful = action.payload;
    },
    setReviewsRecent: (state, action) => {
      state.reviewsRecent = action.payload;
    },
    setReviewsRelevant: (state, action) => {
      state.reviewsRelevant = action.payload;
    }
  }
});

export const {setReviews, setRatingMeta, setReviewsHelpful, setReviewsRecent, setReviewsRelevant} = ratingSlice.actions;

export default ratingSlice.reducer;