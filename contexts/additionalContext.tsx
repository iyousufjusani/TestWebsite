import { createContext, useReducer } from "react";
import { additionalInfoContext } from "../interfaces";
import * as constants from "./constants";

type Props = {
  children: JSX.Element;
};

const initialState: additionalInfoContext = {
  identity: undefined,
  driving_License: undefined,
  vehicle_Document: undefined,
};

type Action = {
  type: string;
  payload: any;
};
type ContextProps = {
  state: additionalInfoContext;
  dispatch: React.Dispatch<Action>;
  constants: typeof constants;
};
const contextProps: ContextProps = {
  state: initialState,
  dispatch: (action: Action) => {},
  constants,
};

const AdditionalContext = createContext(contextProps);

const { Provider } = AdditionalContext;
const AdditionalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    (state: additionalInfoContext, action: Action) => {
      switch (action.type) {
        case constants.SET_ADDITIONAL_INFO:
          return {
            ...state,
            [action.payload.name]: action.payload,
          };
        case constants.UPDATE_ADDITIONAL_INFO:
          return {
            ...state,
            [action.payload.name]: {
              ...state[action.payload.name],
              ...action.payload,
            },
          };
        case constants.REMOVE_ADDITIONAL_INFO:
          const fetchedState = state[action.payload.label];
          delete fetchedState[action.payload.field];

          return {
            ...state,
            [action.payload.label]: { ...fetchedState, isCompleted: false },
          };
        case constants.SET_IDENTITY:
          return {
            ...state,
            identity: action.payload,
          };
        case constants.SET_DRIVINGLICENSE:
          return {
            ...state,
            drivingLicense: action.payload,
          };
        case constants.SET_VEHICLEDOCUMENT:
          return {
            ...state,
            vehicleDocument: action.payload,
          };
        case constants.SET_VEHICLEREQUIRMENTS:
          return {
            ...state,
            vehicleRequirments: action.payload,
          };
        case constants.CHANGE_STATUS:
          const fetchedNewState = state[action.payload.label];

          return {
            ...state,
            [action.payload.label]: {
              ...fetchedNewState,
              isCompleted: action.payload.isCompleted,
            },
          };
        case constants.UPDATE_DRIVINGLICENSE:
          return {
            ...state,
            drivingLicense: {
              ...state.driving_License,
              ...action.payload,
            },
          };
        case constants.UPDATE_IDENTITY:
          return {
            ...state,
            identity: {
              ...state.identity,
              ...action.payload,
            },
          };

        case constants.UPDATE_VEHICLEDOCUMENT:
          return {
            ...state,
            vehicleDocument: {
              ...state.vehicle_Document,
              ...action.payload,
            },
          };
        default:
          return state;
      }
    },
    initialState
  );

  const value: ContextProps = {
    state,
    dispatch,
    constants,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { AdditionalContext, AdditionalProvider };
