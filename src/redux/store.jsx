import { configureStore } from "@reduxjs/toolkit";
import lobbyReducer from "./lobby/slice"

export const store = configureStore({
  reducer: {
    lobby: lobbyReducer,
  },
});