import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../lib/@types';
import { RootState } from '../store';

interface AuthState {
  userInfo: UserInfo | null;
}

// TODO: what's a better way to handle user session than saving it in local storage?
const userInfoFromStorage = localStorage.getItem('userInfo');

const initialState: AuthState = {
  userInfo: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const selectUserInfo = (state: RootState) => state.auth.userInfo;
export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
