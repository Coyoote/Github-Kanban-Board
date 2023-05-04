import { createSlice } from '@reduxjs/toolkit';

type URLState = {
  url: string;
}

const initialState: URLState = {
  url: ''
};

const URLSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    set (state, action) {
      state.url = action.payload;
    }
  }
});

export const { set } = URLSlice.actions;
export default URLSlice.reducer;
