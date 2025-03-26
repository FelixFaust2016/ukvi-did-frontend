import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./splices/formSlice";

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

// Infer types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
