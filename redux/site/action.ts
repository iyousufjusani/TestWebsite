import { cookiesState } from "../../interfaces";
import { AppDispatch } from "../../types";
import { siteActions } from "./reducer";
import SiteApi from "./siteApi";

const siteApi = new SiteApi();
export const setCookiesOptions = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(
      siteActions.setCookies({
        rememberSiteSetting: window.localStorage.getItem("rememberSiteSetting"),
        marketingAndCommunication: window.localStorage.getItem(
          "marketingAndCommunication"
        ),

        measureWebsiteUse: window.localStorage.getItem("measureWebsiteUse"),
      })
    );
  } catch (error: any) {}
};

export const allowAllCookies =
  (cb: Function) => async (dispatch: AppDispatch) => {
    try {
      localStorage.setItem("rememberSiteSetting", "yes");
      localStorage.setItem("marketingAndCommunication", "yes");
      localStorage.setItem("measureWebsiteUse", "yes");

      dispatch(
        siteActions.setCookies({
          rememberSiteSetting: "yes",
          marketingAndCommunication: "yes",

          measureWebsiteUse: "yes",
        })
      );
      cb();
    } catch (error: any) {
      cb();
    }
  };

export const saveCookiePreference =
  (cookiesOptions: cookiesState, cb: Function) =>
  async (dispatch: AppDispatch) => {
    try {
      localStorage.setItem(
        "rememberSiteSetting",
        cookiesOptions.rememberSiteSetting
      );
      localStorage.setItem(
        "marketingAndCommunication",
        cookiesOptions.marketingAndCommunication
      );
      localStorage.setItem(
        "measureWebsiteUse",
        cookiesOptions.measureWebsiteUse
      );
      localStorage.setItem("IsCookiePopupHide", "yes");
      dispatch(siteActions.setCookies(cookiesOptions));
      cb();
    } catch (error: any) {
      cb();
    }
  };

export const getSiteSettings = () => async (dispatch: AppDispatch) => {
  try {
    const settings = await siteApi.getSiteSettings();

    const site = {};
    settings?.forEach((e) => {
      site[e?.id] = { ...e };
    });

    dispatch(siteActions.setSiteSettings(site));
  } catch (error) {}
};
