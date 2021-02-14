import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../types';
import { login } from './thunks';

const initialState: IUser = {
  username: '',
  authenticated: false,
  connection: [],
  token: '',
  loading: false
};

const slice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.username = payload.user.username;
      state.authenticated = true;
      state.token = payload.token;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.authenticated = false;
      state.username = '';
      state.token = '';
    });
  }
});

export default slice.reducer;
