import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cache: {},
  cacheArray: [],
  products: [],
  productsToCompare: [],
  modalIsOpen: false,
};

const currentSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = [];
      for (let i = 0; i < action.payload.length; i++) {
        let current = action.payload[i];
        if (state.cache[current.id]) {
          state.products.push(state.cache[current.id]);
          continue;
        }
        state.products.push(current);
        state.cache[current.id] = current;
        state.cacheArray.push(current.id);
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