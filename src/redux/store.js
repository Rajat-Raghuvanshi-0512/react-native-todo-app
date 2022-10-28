import { configureStore } from "@reduxjs/toolkit";
import { notesReducer } from "./Reducers/noteReducer";
import { userReducer } from "./Reducers/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
  devTools: true,
});
