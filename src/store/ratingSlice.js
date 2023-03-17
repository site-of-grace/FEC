import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  ratingMeta: {},
  reviewPage: 0
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
    }
  }
});

export const {setReviews, setRatingMeta, setReviewPage} = ratingSlice.actions;

export default ratingSlice.reducer;