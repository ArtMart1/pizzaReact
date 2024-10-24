import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItems = {
  id: number;
  title: string;
  price: number;
  activeSize: number;
  imageUrl: string;
  activeType: number;
  count: number;
};
interface CartSlice {
  items: CartItems[];
  totalPrice: number;
}
const initialState: CartSlice = {
  totalPrice: 0,
  items: [],
};
export const cartSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItems>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((acc, obj) => {
        return obj.price * obj.count + acc;
      }, 0);
    },
    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    plusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count++;
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
    resetPrice(state) {
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem, resetPrice, plusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
