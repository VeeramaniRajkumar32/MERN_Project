import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice'
import categorySlice from '../features/category/categorySlice';

export const store = configureStore({
  reducer: {
	auth: authSlice,
	categories: categorySlice,
  },
});
