import * as React from 'react'
import MainContainer from './navigataion/MainContainer';
import store from './store'
import { StoreProvider } from 'easy-peasy';

export default function App() {
  return (
    <StoreProvider store={store}>
      <MainContainer />
    </StoreProvider>
  );
}