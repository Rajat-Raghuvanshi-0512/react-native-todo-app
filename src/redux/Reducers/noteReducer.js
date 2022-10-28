import { createReducer } from "@reduxjs/toolkit";

export const notesReducer = createReducer(
  {
    loading: false,
    error: null,
    isUpdated: false,
    isDeleted: false,
    mynotes: [],
  },
  {
    GET_ALL_NOTES_REQUEST: (state) => {
      state.loading = true;
    },
    GET_ALL_NOTES_SUCCESS: (state, action) => {
      state.loading = false;
      state.mynotes = action.payload;
    },
    GET_ALL_NOTES_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    EDIT_NOTE_REQUEST: (state) => {
      state.loading = true;
    },
    EDIT_NOTE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    EDIT_NOTE_RESET: (state) => {
      state.loading = false;
      state.isUpdated = false;
    },
    EDIT_NOTE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    DELETE_NOTE_REQUEST: (state) => {
      state.loading = true;
    },
    DELETE_NOTE_SUCCESS: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
    },
    DELETE_NOTE_RESET: (state) => {
      state.loading = false;
      state.isDeleted = false;
    },
    DELETE_NOTE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    ADD_NOTE_REQUEST: (state) => {
      state.loading = true;
    },
    ADD_NOTE_SUCCESS: (state, action) => {
      state.loading = false;
      state.mynotes.push(action.payload.note);
    },
    ADD_NOTE_FAIL: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    CLEAR_ERRORS: (state) => {
      state.error = null;
    },
  }
);
