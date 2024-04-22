import { createSlice } from "@reduxjs/toolkit";

let userAccessToken;

if (localStorage.getItem("userAccessToken")) {
  userAccessToken = JSON.parse(localStorage.getItem("userAccessToken"));
}

const initialState = {
  userAccessToken: userAccessToken ? userAccessToken : null,
};

const userSliceAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userAccessToken", JSON.stringify({ userAccessToken: action.payload }));
    },
    logoutUser: (state) => {
      state.userAccessToken = null;
      localStorage.removeItem("userAccessToken");
    },
  },
});

export const { setUser, logoutUser } = userSliceAuth.actions;
export default userSliceAuth.reducer;
