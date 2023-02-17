import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import mailReducer from '../features/mailSlice';
import sentReducer from '../features/sentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    mail: mailReducer,
    sent: sentReducer,
  
  },
});
