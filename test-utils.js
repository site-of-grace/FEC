import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { store } from './src/store/index.js';
import { Provider } from 'react-redux';


//custom render that includes redux provider
const render = ( ui, {...renderOptions} = {}) => {
  const Wrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
  };


  // re-export everything
export * from '@testing-library/react';
// override render method
export { render };

