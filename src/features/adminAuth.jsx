import { createSlice } from "@reduxjs/toolkit";

let accessToken;

if (localStorage.getItem("accessToken")) {
  accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

const initialState = {
  accessToken: accessToken ? accessToken : null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("accessToken", JSON.stringify({ accessToken: action.payload }));
    },
    logoutAdmin: (state) => {
      state.accessToken = null;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setAdmin, logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
