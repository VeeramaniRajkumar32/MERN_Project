import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import { startTransition } from "react";
import categoryService from "./categoryService";

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const category = createAsyncThunk(
  "category/create",
  async (categoryData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryService.createCategory(categoryData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(category.pending, (state) => {
        startTransition.isLoading = true;
      })
      .addCase(category.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.category.push(action.payload);
      })
      .addCase(category, isRejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
