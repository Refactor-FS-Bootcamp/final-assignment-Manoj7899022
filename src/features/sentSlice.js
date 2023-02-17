import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  value : false
};

export const sentSlice = createSlice({
  name: 'sent',
  initialState,
  reducers: {
    setSent: (state, action) => {
      state.value = action.payload;
    },
    setInbox: (state, action) => {
        state.value = action.payload;
      }
  },
});

export const { setSent, setInbox } = sentSlice.actions;
export const selectSent = (state) => state.sent.value;
export default sentSlice.reducer;