import { configureStore } from '@reduxjs/toolkit';
// import reducer from Slice (exported by `export default currentSlice.reducer`)
import productReducer from './productSlice';
import overviewReducer from './overviewSlice';
import ratingReducer from './ratingSlice';
import questionReducer from './questionsSlice';

export const store = configureStore({
  reducer: {
    // reducer: reducer
    products: productReducer,
    overview: overviewReducer,
    rating: ratingReducer,
    question: questionReducer,
  },
  devTools: false,
});

