import { createSlice } from "@reduxjs/toolkit";

let providerAccessToken;


if (localStorage.getItem("providerAccessToken")) {
  providerAccessToken = JSON.parse(localStorage.getItem("providerAccessToken"));
}

const initialState = {
  providerAccessToken: providerAccessToken ? providerAccessToken : null,
};

const providerAuthSlice = createSlice({
  name: "providerAuth",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
      localStorage.setItem(
        "providerAccessToken",
        JSON.stringify({ providerAccessToken: action.payload })
      );
    },
    logoutProvider: (state) => {
      state.accessToken = null;
      localStorage.removeItem("providerAccessToken");
    },
  },
});

export const { setProvider, logoutProvider } = providerAuthSlice.actions;
export default providerAuthSlice.reducer;
