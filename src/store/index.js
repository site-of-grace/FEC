import { configureStore } from '@reduxjs/toolkit';
// import reducer from Slice (exported by `export default currentSlice.reducer`)
import textReducer from './productSlice';
import overviewReducer from './overviewSlice';

export const store = configureStore({
  reducer: {
    // reducer: reducer
    text: textReducer,
    overview: overviewReducer,
  },
  devTools: true,
});