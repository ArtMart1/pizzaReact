import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title';
};
interface FilterState {
  categoryId: number;
  sort: Sort;
  currentPage: number;
}
const initialState: FilterState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  currentPage: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, actions: PayloadAction<number>) {
      state.categoryId = actions.payload;
    },
    setSortId(state, actions: PayloadAction<Sort>) {
      state.sort = actions.payload;
    },
    setFilters(state, actions: PayloadAction<FilterState>) {
      state.currentPage = actions.payload.currentPage;
      state.sort = actions.payload.sort;
      state.categoryId = actions.payload.categoryId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortId, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
