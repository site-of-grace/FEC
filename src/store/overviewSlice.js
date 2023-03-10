import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainProduct: {},
  styles: {},
  mainPhotos: [],
  selectedStyle: {},
  myOutfit: []
};



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
    },
    setSelectedstyle: (state, action) => {
      state.selectedStyle = action.payload;
    },
    setMyOutfit: (state, action) => {
      state.myOutfit.push(action.payload);
    }
  }
});

export const { setMainProduct, setStyles, setMainPhotos, setMyOutfit, setSelectedstyle } = overviewSlice.actions;

export default overviewSlice.reducer;