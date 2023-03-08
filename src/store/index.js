import { configureStore } from '@reduxjs/toolkit';
// import reducer from Slice (exported by `export default currentSlice.reducer`)
import textReducer from './productSlice';

export const store = configureStore({
  reducer: {
    // reducer: reducer
    text: textReducer,
  },
  devTools: true,
});