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
  ],
  outfitMap: {'001': true},
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
      if (state.outfitMap[action.payload.id]) {
        return;
      }

      state.outfitMap[action.payload.id] = true;
      state.myOutfit.push(action.payload);
    },
    setOutfits: (state, action) => {
      action.payload.forEach(outfit => {
        state.outfitMap[outfit.id] = true;
      });

      state.myOutfit = action.payload;
    },
    removeOutfit: (state, action) => {
      if (!state.outfitMap[action.payload.id]) {
        return;
      }

      delete state.outfitMap[action.payload.id];
      state.myOutfit = state.myOutfit.filter((item) => item.id !== action.payload.id);
    }
  }
});

export const { setMainProduct, setOutfits, setStyles, setMainPhotos, setMyOutfit, removeOutfit, setSelectedstyle } =
  overviewSlice.actions;

export default overviewSlice.reducer;
