import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../types';
import { login } from './thunks';

const initialState: IUser = {
  username: '',
  authenticated: false,
  connection: [],
  token: ''
};

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {});
    builder.addCase(login.fulfilled, (state, action) => {});
    builder.addCase(login.rejected, (state, action) => {});
  }
});

export default slice.reducer;
