import { createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('users/fetchByIdStatus', async (userId, thunkAPI) => {
  const response = await fetch('');
  return response;
});
