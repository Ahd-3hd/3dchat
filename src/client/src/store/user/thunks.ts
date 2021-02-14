import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('users/fetchByIdStatus', async (loginData: { username: string; password: string }) => {
  const {
    data: { token, user }
  } = await axios.post('http://localhost:1337/users/login', loginData);
  if (user && token) {
    localStorage.setItem('ahdtoken', token);
  }
  return {
    token,
    user
  };
});
