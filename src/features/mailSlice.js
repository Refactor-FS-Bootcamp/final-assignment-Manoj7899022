import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  mailId: null
};

export const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    setMailId: (state, action) => {
      state.mailId = action.payload;
    }
  },
});

export const { setMailId } = mailSlice.actions;
export const selectMailId = (state) => state.mail.mailId;
export default mailSlice.reducer;