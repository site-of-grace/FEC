import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  ratingMeta: {},
  reviewsRelevant: [],
  reviewsHelpful: [],
  reviewsRecent: [],
  average: []
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
    },
    setAverage: (state, action) => {
      state.average = action.payload;
      console.log(state.average);
    }
  }
});

export const {setReviews, setRatingMeta, setReviewsHelpful, setReviewsRecent, setReviewsRelevant, setAverage} = ratingSlice.actions;

export default ratingSlice.reducer;