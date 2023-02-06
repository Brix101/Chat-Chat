import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../../app/services/authServices';
import type { RootState } from '../../app/store';

const initialState = {
  token: null,  
  isAuthenticated: false,
} as {  token: string | null,isAuthenticated: boolean}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    tokenReceived: (state,{payload}:PayloadAction<string | null>)=>{
        state.token = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(login.matchPending, (state, action) => {
        console.log('pending', action)
      })
      .addMatcher(login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action)
        state.token = action.payload.token
      })
      .addMatcher(login.matchRejected, (state, action) => {
        console.log('rejected', action)
      })
  },
})

export const { logout,tokenReceived } = slice.actions

export default slice.reducer

export const selectIsAuthenticated = (state: RootState) => state.auth
