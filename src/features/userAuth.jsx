import { createSlice } from "@reduxjs/toolkit";

let user;

if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
}

const initialState = {
  user: user ? user.userEmail : null,
};

const userSliceAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify({ user: action.payload }));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, logoutUser } = userSliceAuth.actions;
export default userSliceAuth.reducer;
