import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logout } from "../../app/services/authServices";
import { getUser, User } from "../../app/services/userServices";
import type { RootState } from "../../app/store";

interface UserState {
  user?: User | null;
}

const initialState: UserState = {
  user: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(getUser.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(logout.matchFulfilled, () => initialState);
  },
});

export const { resetUserState } = slice.actions;

export default persistReducer(
  {
    key: slice.name,
    storage,
    whitelist: [""],
  },
  slice.reducer
);

export const userState = (state: RootState) => state.user;
