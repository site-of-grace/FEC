import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cache: {},
  cacheArray: [],
  products: [],
  productsToCompare: [],
  modalIsOpen: false
};

const currentSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = [];
      let mainProduct = null;
      for (let i = 0; i < action.payload.length; i++) {
        let current = action.payload[i];

        if (!current.id) {
          continue;
        }

        if (current.mainProduct && !mainProduct) {
          mainProduct = current;
        }

        if (state.cache[current.id]) {
          if (state.products.find(obj => obj.id === current.id)) {
            continue;
          }

          const cachedProduct = state.cache[current.id];
          if (mainProduct) {
            cachedProduct.mainProduct = mainProduct;
          }
          state.products.push(cachedProduct);
          continue;
        }
        state.products.push(current);
        state.cache[current.id] = current;
        state.cacheArray.push(current.id );
      }
    },
    setIsOpen: (state, action) => {
      state.modalIsOpen = action.payload;
    },
    setProductsToCompare: (state, action) => {
      state.productsToCompare = action.payload;
    },
    addToCache: (state, action) => {
      let current = action.payload;
      if (state.cache[current.id]) {
        return;
      }
      state.cache[current.id] = current;
      state.cacheArray.push(current.id);
    },
    reloadCache: (state, action) => {
      state.cache = action.payload;
      state.cacheArray = Object.keys(action.payload);
    },
  }
});

export const { setProducts, setIsOpen, setProductsToCompare, addToCache, reloadCache } =
  currentSlice.actions;

export default currentSlice.reducer;
