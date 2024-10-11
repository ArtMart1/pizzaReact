import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
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
    setCategoryId(state, actions) {
      state.categoryId = actions.payload;
    },
    setSortId(state, actions) {
      state.sort = actions.payload;
    },
    setFilters(state, actions) {
      state.currentPage = actions.payload.currentPage;
      state.sort = actions.payload.sort;
      state.categoryId = actions.payload.categoryId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortId, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
