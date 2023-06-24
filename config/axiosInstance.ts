//axios configurations
import axios from "axios";
import moment from "moment";
import { baseURL } from "./endPoint";
import { store } from "./store";

export const INSTANCE = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

INSTANCE.interceptors.request.use((request) => {
  if (request.url === "auth/refresh-tokens") {
    return request;
  }
  return checkExpireToken(request);
});
INSTANCE.interceptors.response.use((response) => {
  return response;
});

export const insertToken = async (token: any) => {
  INSTANCE.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const checkExpireToken = (config: any) => {
  const tokenExpiryDate: any = store.getState().auth?.token?.expirationTime;
  const needsRefresh = moment(new Date(tokenExpiryDate)).isSameOrBefore(
    new Date(),
    "milliseconds"
  );
  if (needsRefresh) {
    return executeSilentRefresh(config);
  }
  config.headers.Authorization = `Bearer ${
    store.getState().auth?.token?.access
  }`;
  return config;
};

const executeSilentRefresh = async (config: any) => {
  function handleError(err: any) {
    // fail safe: delete auth header
    delete config.headers.Authorization;
    return config;
  }
  try {
    return config;
  } catch (error: any) {
    return handleError(
      `Error: [${error.response.status || 500}] ${
        error.response.data.msg || "SERVER_ERROR"
      }`
    );
  }
};
