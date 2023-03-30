import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cache: {},
  products: [],
  productsToCompare: [],
  modalIsOpen: false,
};

const currentSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.cache[action.payload[i].id] = action.payload[i];
        state.products.push(action.payload[i]);
      }
    },
    setIsOpen: (state, action) => {
      state.modalIsOpen = action.payload;
    },
    setProductsToCompare: (state, action) => {
      state.productsToCompare = action.payload;
    },
  }
});

export const { setProducts, setIsOpen, setProductsToCompare } = currentSlice.actions;

export default currentSlice.reducer;