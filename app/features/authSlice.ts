import { createSlice } from '@reduxjs/toolkit';
import type { User } from '../../types/User';
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
  reducers: {
    reauthUser: (state, { payload }) => {
      state.isAuthenticated = true;
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.logIn.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload;
      }
    );
    builder.addMatcher(authApi.endpoints.logOut.matchFulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addMatcher(
      authApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload;
      }
    );
  },
});

export default authSlice.reducer;

export const { reauthUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
