import { configureStore } from "@reduxjs/toolkit";
import overlaySlice from "./overlaySlice";
import personFormSlice from "./personFormSlice";
import personListSlice from "./personSlice";

export const store = configureStore({
  reducer: {
    personList: personListSlice,
    overlay: overlaySlice,
    personForm: personFormSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
