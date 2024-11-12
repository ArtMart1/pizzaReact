import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice';
import cart from './cartSlice';
import pizza from './pizzaSlice';
import auth from './authSlice';
export const store = configureStore({
  reducer: { filter, cart, pizza, auth },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
