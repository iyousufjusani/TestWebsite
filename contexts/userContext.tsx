import { createContext, useReducer } from "react";
import { userContext } from "../interfaces";
import * as constants from "./constants";

type Props = {
  children: JSX.Element;
};

const initialState: userContext = {
  name: "",
  currentStep: 1,
  basicInfo: {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phoneNumber: "",
  },
};

type Action = {
  type: string;
  payload: any;
};
type ContextProps = {
  state: userContext;
  dispatch: React.Dispatch<Action>;
  constants: typeof constants;
};
const contextProps: ContextProps = {
  state: initialState,
  dispatch: (action: Action) => {},
  constants,
};

const UserContext = createContext(contextProps);

const { Provider } = UserContext;
const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer((state: userContext, action: Action) => {
    switch (action.type) {
      case constants.SET_USER_NAME:
        return {
          ...state,
          name: action.payload,
        };
      case constants.SET_BASIC_INFO:
        return {
          ...state,
          currentStep: state.currentStep + 1,
          basicInfo: {
            ...action.payload,
          },
        };

      default:
        return state;
    }
  }, initialState);

  const value: ContextProps = {
    state,
    dispatch,
    constants,
  };

  return <Provider value={value}>{children}</Provider>;
};

export { UserContext, UserProvider };
