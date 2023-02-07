import { configureStore, createReducer } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});
