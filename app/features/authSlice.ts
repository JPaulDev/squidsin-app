import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../services/auth';
import { authApi } from '../services/auth';
import type { RootState } from '../store';

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload;
      }
    );
  },
});

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
