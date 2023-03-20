import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cache: {},
  products: [],
};

const currentSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.cache[action.payload[i].id] = action.payload[i];
        state.products.push(action.payload[i]);
      }
    }
  }
});

export const { setProducts } = currentSlice.actions;

export default currentSlice.reducer;