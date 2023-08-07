import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../lib/@types';

// login set credentials to set the user in local storage
// logout

interface AuthState {
  userInfo: UserInfo | null;
}

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
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
