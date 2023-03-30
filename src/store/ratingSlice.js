import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
  ratingMeta: {},
  reviewsRelevant: [],
  reviewsHelpful: [],
  reviewsRecent: [],
  average: 0,
  ratingMetaTotal: [], //A lot of these ratings are hidden from the user.
  filterRating: false
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
    },
    setRatingMetaTotal: (state, action) => {
      state.ratingMetaTotal = action.payload;
    },
    setFilterRating: (state, action) => {
      state.filterRating = action.payload;
    }
  }
});

export const {setReviews, setRatingMeta, setReviewsHelpful, setReviewsRecent, setReviewsRelevant, setAverage, setRatingMetaTotal, setFilterRating} = ratingSlice.actions;

export default ratingSlice.reducer;