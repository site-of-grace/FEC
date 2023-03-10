import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainProduct: {},
  styles: {},
  mainPhotos: []
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

const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {
    setMainProduct: (state, action) => {
      state.mainProduct = action.payload;
    },
    setStyles: (state, action) => {
      state.styles = action.payload;
    },
    setMainPhotos: (state, action) => {
      state.mainPhotos = action.payload;
    }
  }
});

export const { setMainProduct, setStyles, setMainPhotos } = overviewSlice.actions;

export default overviewSlice.reducer;