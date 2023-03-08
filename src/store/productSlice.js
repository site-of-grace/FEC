import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  products: []
};

/*
store: {
  // this slice in this file
  text: {
    message: 'Hello World',
    products: []
  },
  // another slice, cartSlice.js
  cart: {
  }
}
*/

const currentSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      // rule 1: no async code
      // rule 2: you can mutate state
      state.message = action.payload;
    },
    setProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
    }
  }
});

export const { setMessage } = currentSlice.actions;

export default currentSlice.reducer;