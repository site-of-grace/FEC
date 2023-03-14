import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviews: [],
};


const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  }
});

export const {setReviews} = ratingSlice.actions;

export default ratingSlice.reducer;