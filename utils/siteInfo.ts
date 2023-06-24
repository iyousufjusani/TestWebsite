import { store } from "../config/store";

export const siteName = () => {
  const { site } = store.getState()?.site;
  return site?.Settings?.name || "Hiring Drivers In Exeter";
};
export const siteTitle = () => {
  const { site } = store.getState()?.site;
  return (
    site?.Settings?.title ||
    "Get Exeter City Council Licensing & Start Earning."
  );
};
export const siteDescription = () => {
  const { site } = store.getState()?.site;
  return (
    site?.Settings?.description ||
    "Looking for a job? Navigo is hiring drivers in Exeter! Get Exeter city council licensing and start with the best taxi in Exeter."
  );
};
export const siteKeywords = () => {
  const { site } = store.getState()?.site;
  return (
    site?.Settings?.keywords ||
    "Taxi Exeter, Taxis Exeter, Taxi in Exeter, Taxis in Exeter, Taxi Service Exeter, Taxi Service in Exeter, Best Taxi Service Exeter, Best Taxi Services in Exeter, Cabs Exeter, Cab in Exeter, Cabs in Exeter, Ride Hailing Services in Exeter, Transportation Service in Exeter, Best Taxi Service in Exeter, Navigo Taxis, Navigo Taxis Exeter, Navigo Taxis in Exeter, Navigo UK, Navigo Exeter, Navigo Taxi, Apple Taxis, Uber"
  );
};
export const siteLogo = () => {
  const { site } = store.getState()?.site;
  return site?.Images?.sitelogo || "images/navigoLogo.png";
};
export const siteFav = () => {
  const { site } = store.getState()?.site;
  return site?.Images?.favIcon || "/images/favCircle.png";
};

export const socialFb = () => {
  const { site } = store.getState()?.site;
  return site?.Settings?.facebookUrl || "/";
};
export const socialInstagram = () => {
  const { site } = store.getState()?.site;
  return site?.Settings?.instagramUrl || "/";
};
export const socialYoutube = () => {
  const { site } = store.getState()?.site;
  return site?.Settings?.youtubeUrl || "/";
};
export const socialLinkdin = () => {
  const { site } = store.getState()?.site;
  return site?.Settings?.linkdinUrl || "/";
};
export const socialTwitter = () => {
  const { site } = store.getState()?.site;
  return site?.Settings?.twitterUrl || "/";
};
export const playStore = () => {
  const { site } = store.getState()?.site;
  return site?.Settings?.playStoreUrl || "/";
};
export const appStore = () => {
  const { site } = store.getState()?.site;
  return site?.Settings?.appStoreUrl || "/";
};
