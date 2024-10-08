import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
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
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSortId } = filterSlice.actions;

export default filterSlice.reducer;
