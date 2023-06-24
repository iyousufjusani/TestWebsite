import React from "react";

export interface RouteData {
  path: string;
  layout?: React.ComponentType<any>;
  guard?: React.ComponentType<any>;
  component: React.ComponentType<any>;
  check?: React.ComponentType<any>;

  subRoutes?: RouteData[];
}
export interface cookiesState {
  measureWebsiteUse: string;
  marketingAndCommunication: string;
  rememberSiteSetting: string;
}
export interface siteState {
  cookies: cookiesState;
  site: any;
}
export interface tokensState {
  access: string;
  refresh: string;
  expirationTime: number;
}
export interface chatSession {
  createdAt: number;
  startAt?: number;
  endAt?: number;
  endBy?: string;
  startBy?: string;
  createdBy: string;
  chats?: ChatObject[];
  id: string;
  users: chatUserObject[];
  platform?: "client" | "rider" | "restaurant";
}
interface chatUserObject {
  name: string;
  email: string;
  number: string;
  typing: boolean;
  id: string;
  role: string;
  image: string;
}
export interface ChatObject {
  senderId?: string;
  message: string;
  time: number;
  status: "SEND" | "RECEIVED" | "SEEN";
  id: string;
  files?: File[];
}
interface userProps {
  name: string;

  email: string;
  phoneNumber: string;
  role: string;
  id: string;
  emailVerified: boolean;
  profileImage?: string;
  isDocumentsProvided?: boolean;
  address?: AddressProps;
}

export interface authState {
  user: userProps | null;
  token: tokensState | null;
  vehicles: driverVehicle[];
}
export interface forgetPasswordState {
  email: string;
}

export interface driverVehicle {
  name: string;
  type: string;
  imageUrl: string;
  registrationNumber: string;
  mot: string;
  motExpiry: string;
  make: string;
  model: string;
  color: string;
  bodyType: string;
  passengers: number;
  keeperName: string;
  keeperAddress: string;
  note: string;
  isActive?: boolean;
  id?: string;
}

export interface userContext {
  name: string;
  currentStep: number;
  basicInfo: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    city: string;
  };
}
export interface additionalInfoContext {
  identity?: {
    id: string;
    proofOfIdentity: string[];
    bankStatement: string[];
    profilePhoto: string[];
    isCompleted: boolean;
    disclosureBarringService: string[];
  };
  driving_License?: {
    id: string;
    DVLAPlastic: string[];
    DVLAElectronicCode: string[];
    privateHire: string[];
    isCompleted: boolean[];
  };
  vehicle_Document?: {
    id: string;
    insuranceCertificate: string[];
    insuranceSupporting: string[];
    motTestCertificate: string[];
    publicLiabilityInsurance: string[];
    phvLicence: string[];
    logBook: string[];
    isCompleted: boolean;
  };
}
export interface loginState {
  password: string;

  email: string;
}

export interface paymentForm {
  accountHolderName: string;

  bankName: string;
  accountNumber: string;
  sortCode: string;
  id?: string;
}
export interface registerState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  city: string;
}

export interface homeJoinUsCard {
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
  id: string;
}

export interface HomeServicesProps {
  title?: string;
  description?: string;
  image?: string;
  imageLeft?: boolean;
  imageAlt?: string;
  id?: string;
}
export interface HomeFacilityProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  id?: string;
}
export interface WhyNavigoFeaturesProps {
  title?: string;
  description?: string;
}
export interface HomeFAQSProps {
  title?: string;
  description?: string;
  key: string;
}
export interface AddressProps {
  address: string;
  city?: string | null;
  area?: string | null;
  county?: string | null;
  country?: string | null;
  latValue: number;
  lngValue: number;
  postCode?: string | null;
  road?: string | null;
}
export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}
