import { createSlice } from "@reduxjs/toolkit";
import { siteState } from "../../interfaces";

const initialState: siteState = {
  cookies: {
    rememberSiteSetting: "no",
    marketingAndCommunication: "no",
    measureWebsiteUse: "no",
  },
  site: null,
};

const reducers = {
  setCookies: (state: siteState, action: any) => {
    state.cookies = action.payload;
  },
  setSiteSettings: (state: siteState, action: any) => {
    state.site = action.payload;
  },
};

const site = createSlice({
  name: "site",
  initialState,
  reducers,
});

export const siteActions = site.actions;

export default site.reducer;
