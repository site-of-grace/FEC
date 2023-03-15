import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  ratingMeta: {},
  reviewAmount: 0
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
    setReviewAmount: (state, action) => {
      state.reviewAmount = action.payload;
    }
  }
});

export const {setReviews, setRatingMeta, setReviewAmount} = ratingSlice.actions;

export default ratingSlice.reducer;