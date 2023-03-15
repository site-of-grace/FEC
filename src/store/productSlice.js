import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: new Map()
};

const currentSlice = createSlice({
  name: 'text',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.products.set(action.payload[i].id, action.payload[i]);
      }
    }
  }
});

export const { setProducts } = currentSlice.actions;

export default currentSlice.reducer;