import { createSlice } from '@reduxjs/toolkit';
const { getThumbnailMap } = require('../utils/traverse.js');

const initialState = {
  mainProduct: {},
  styles: {},
  mainPhotos: [],
  selectedStyle: {},
  myOutfit: [
    {
      id: '001',
      name: 'Add to Outfit',
      category: '',
      default_price: '',
      features: [],
      validPhotos: [],
      styles: [{ photos: [{ thumbnail_url: '/icons/placeholder-plus.jpg' }] }]
    }
  ]
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
      state.mainProduct.styles = action.payload.results;
      state.mainProduct.validPhotos = getThumbnailMap(action.payload.results);
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

export const { setMainProduct, setStyles, setMainPhotos, setMyOutfit, setSelectedstyle } =
  overviewSlice.actions;

export default overviewSlice.reducer;
