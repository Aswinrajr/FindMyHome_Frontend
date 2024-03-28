import { createSlice } from "@reduxjs/toolkit";

let provider;

if (localStorage.getItem("provider")) {
  provider = JSON.parse(localStorage.getItem("provider"));
}

const initialState = {
  provider: provider ? provider.providerEmail : null,
};

const providerAuthSlice = createSlice({
  name: "providerAuth",
  initialState,
  reducers: {
    setProvider: (state, action) => {
      state.provider = action.payload;
      localStorage.setItem(
        "provider",
        JSON.stringify({ provider: action.payload })
      );
    },
    logoutProvider: (state) => {
      state.provider = null;
      localStorage.removeItem("provider");
    },
  },
});

export const { setProvider, logoutProvider } = providerAuthSlice.actions;
export default providerAuthSlice.reducer;
