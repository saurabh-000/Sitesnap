import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userData: null,
    isLoggedIn: false,
  };
const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            state.isLoggedIn = true;
          },
          clearUserData: (state) => {
            state.userData = null;
            state.isLoggedIn = false;
          },
    }
  })
export const { setUserData, clearUserData } = UserSlice.actions;
export default UserSlice.reducer;