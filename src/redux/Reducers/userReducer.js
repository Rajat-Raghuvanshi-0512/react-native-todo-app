import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {
    loading: false,
    userloading: false,
    isAuthenticated: false,
    error: null,
    userInfo: {},
    isUpdated: false,
    message: "",
  },
  {
    LOAD_USER_REQUEST: (state) => {
      state.userloading = true;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.userloading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },
    LOAD_USER_FAIL: (state, action) => {
      state.userloading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    LOGOUT_REQUEST: (state) => {
      state.loading = true;
    },
    LOGOUT_SUCCESS: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.userInfo = {};
    },
    LOGOUT_FAIL: (state, action) => {
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
    UPDATE_PROFILE_REQUEST: (state) => {
      state.loading = true;
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
      state.loading = false;
      state.message = "Profile updated successfully";
      state.isUpdated = action.payload.isUpdated;
    },
    UPDATE_PROFILE_RESET: (state) => {
      state.isUpdated = false;
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CHANGE_PASS_REQUEST: (state) => {
      state.loading = true;
    },
    CHANGE_PASS_SUCCESS: (state, action) => {
      state.loading = false;
      state.message = "Password changed successfully";
      state.isUpdated = action.payload.isUpdated;
    },
    CHANGE_PASS_RESET: (state) => {
      state.isUpdated = false;
    },
    CHANGE_PASS_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
    CLEAR_MESSAGE: (state) => {
      state.message = "";
    },
  }
);
