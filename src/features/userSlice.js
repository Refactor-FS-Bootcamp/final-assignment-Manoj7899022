import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.value = null;
    }
  },
});

export const { login, logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;
