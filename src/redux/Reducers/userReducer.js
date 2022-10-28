import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {
    loading: false,
    isAuthenticated: false,
    error: null,
    userInfo: {},
  },
  {
    LOAD_USER_REQUEST: (state) => {
      state.loading = true;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
    LOAD_USER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LOGIN_REQUEST: (state) => {
      state.loading = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
    LOGIN_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    REGISTER_REQUEST: (state) => {
      state.loading = true;
    },
    REGISTER_SUCCESS: (state, action) => {
      state.loading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
    REGISTER_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);
