import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment, useEffect, useMemo, useState } from "react";
import Geocode from "react-geocode";
import "react-phone-number-input/style.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import ScreenLoader from "../components/ScreenLoader";
import CookiePopup from "../components/CookiePopup";
import { persistor, store } from "../config/store";

import { getCurrentUser, getUserAdditionalInfo } from "../redux/auth/action";
import { getSiteSettings, setCookiesOptions } from "../redux/site/action";
import "../styles/globals.css";
import "../styles/theme.scss";
import { siteFav } from "../utils/siteInfo";
import ChatBoxIcon from "../components/ChatBoxIcon";

Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "");
function MyApp({ Component, pageProps }: AppProps | any) {
  const { ContextProvider, Layout, pageTitle, Protection } = useMemo(() => {
    return {
      ContextProvider: Component.context || Fragment,
      Layout: Component.layout || Fragment,
      Protection: Component.protection || Fragment,

      pageTitle: Component.pageTitle || "",
    };
  }, [Component]);

  const [loader, setLoader] = useState(true);
  const stopLoader = () => {
    store.dispatch(getUserAdditionalInfo(() => { }));
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    store.dispatch(getCurrentUser(stopLoader));
    store.dispatch(setCookiesOptions());
    store.dispatch(getSiteSettings());
  }, []);

  return (
    <>
      <Head>
        <title>
          Hiring drivers in Exeter | Get Exeter city council licensing | Start
          earning
        </title>
        <meta
          name="title"
          content="Hiring drivers in Exeter | Get Exeter city council licensing | Start earning"
        />
        <meta
          name="description"
          content="Looking for a job? Navigo is hiring drivers in Exeter! Get Exeter city council licensing and start driving an Exeter taxi with the best taxi in Exeter."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://navigotaxis.com/" />
        <meta
          property="og:title"
          content="Hiring drivers in Exeter | Get Exeter city council licensing | Start earning"
        />
        <meta
          property="og:description"
          content="Looking for a job? Navigo is hiring drivers in Exeter! Get Exeter city council licensing and start driving an Exeter taxi with the best taxi in Exeter."
        />
        <meta property="og:image" content="" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://navigotaxis.com/" />
        <meta
          property="twitter:title"
          content="Drive with Navigo | Make money by helping us move millions."
        />

        <meta
          property="twitter:description"
          content="You can drive part time or full time around Exeter for Navigo and make money. Earn anytime, anywhere. Only drive when it works for you and set your own schedule."
        />
        <meta property="twitter:image" content="" />

        <meta
          name="keywords"
          content="Navigo Taxis, Navigo Taxis in Exeter, navigotaxis, ride-hailing services in Exeter, transportation service in Exeter, taxi service in Exeter, Navigo UK, Navigo Exeter"
        />
        <link rel="icon" href={siteFav()} />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Protection>
            <ContextProvider>
              {loader ? (
                <ScreenLoader src="/vedios/loaderLogo.gif" />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                  <CookiePopup />
                </Layout>
              )}
            </ContextProvider>
          </Protection>
        </PersistGate>
        <ChatBoxIcon />

        <ToastContainer />
      </Provider>
    </>
  );
}

export default MyApp;
