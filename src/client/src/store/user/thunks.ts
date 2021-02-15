import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('users/login', async (loginData: { username: string; password: string }) => {
  const {
    data: { token, user }
  } = await axios.post('http://localhost:1337/users/login', loginData);
  if (user && token) {
    localStorage.setItem(
      'ahdtoken',
      JSON.stringify({
        token: token,
        user: user
      })
    );
  }
  return {
    token,
    user
  };
});
