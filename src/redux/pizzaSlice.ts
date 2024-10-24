import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItems } from './cartSlice';

type FetchPizza = {
  categoryId: number;
  sortType: string;
  currentPage: number;
  searchValue: string | number;
};
export const fetchPizza = createAsyncThunk<Pizza[], FetchPizza>(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizza) => {
    const { categoryId, sortType, currentPage, searchValue } = params;
    const limit = 4;
    const start = currentPage * limit;
    const end = start + limit;

    let query = `https://json-server-heroku-4ed1462f6bda.herokuapp.com/items-pizza?${
      categoryId > 0 ? `category=${categoryId}&` : ''
    }&_sort=${sortType}&_order=desc`;

    if (searchValue) {
      query += `&q=${searchValue}`;
    } else {
      query += `&_start=${start}&_end=${end}`;
    }

    const { data } = await axios.get(query);
    return data;
  },
);
type Pizza = {
  id: number;
  title: string;
  price: number;
  sizes: number[];
  imageUrl: string;
  types: number[];
};
interface PizzaState {
  items: Pizza[];
  status: 'loading' | 'idle' | 'error' | 'success';
}
const initialState: PizzaState = {
  items: [],
  status: 'idle',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizza.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        // Add user to the state array
        state.items = action.payload;
        state.status = 'success';
      })

      .addCase(fetchPizza.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
