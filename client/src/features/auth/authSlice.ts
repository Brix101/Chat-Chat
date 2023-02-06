import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { login, logout } from "../../app/services/authServices";
import type { RootState } from "../../app/store";

const initialState = {
  token: null,
} as { token: string | null };

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => initialState,
    tokenReceived: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(login.matchFulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addMatcher(logout.matchFulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
  },
});

export const { resetAuthState, tokenReceived } = slice.actions;

export default persistReducer(
  {
    key: slice.name,
    storage,
    whitelist: ["token"],
  },
  slice.reducer
);

export const authState = (state: RootState) => state.auth;
