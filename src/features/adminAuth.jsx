import { createSlice } from "@reduxjs/toolkit";

let admin;

if (localStorage.getItem("admin")) {
  admin = JSON.parse(localStorage.getItem("admin"));
}

const initialState = {
  admin: admin ? admin.adminEmail : null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("admin", JSON.stringify({ admin: action.payload }));
    },
    logoutAdmin: (state) => {
      state.admin = null;
      localStorage.removeItem("admin");
    },
  },
});

export const { setAdmin, logoutAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
