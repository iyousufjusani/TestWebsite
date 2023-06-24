import { createSlice } from "@reduxjs/toolkit";
import { authState } from "../../interfaces";

const initialState: authState = {
  user: null,
  token: null,
  vehicles: [],
};

const reducers = {
  setUser: (state: authState, action: any) => {
    state.user = action.payload.user;
    state.token = action.payload.token;
  },
  logout: (state: authState) => {
    state.user = null;
    state.token = null;
  },
  updateUser: (state: authState, action: any) => {
    state.user = {
      ...state.user,
      ...action.payload,
    };
  },
  addDriverVehicles: (state: authState, action: any) => {
    const addedData = state.vehicles.concat(action.payload);
    state.vehicles = addedData;
  },
  setAllDriverVehicles: (state: authState, action: any) => {
    state.vehicles = action.payload;
  },
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers,
});

export const authActions = auth.actions;

export default auth.reducer;
