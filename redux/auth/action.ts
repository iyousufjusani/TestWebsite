import { deleteField } from "firebase/firestore";
import { changePassProps } from "../../components/ChangePassword";
import { profileProps } from "../../components/ProfileForm";
import {
  additionalInfoContext,
  chatSession,
  driverVehicle,
  paymentForm,
  registerState,
} from "../../interfaces";
import { AppDispatch, RootState } from "../../types";
import { addCreateHistory, createDisplayName } from "../../utils/auth.utils";
import { v4 as uuidv4 } from "uuid";
import AuthApi from "./authApi";
import { authActions } from "./reducer";
import { vehicleRequirmentsProps } from "../../components/vehicaleRequirments";

const authApi = new AuthApi();
interface userState extends registerState {
  password: string;
}
export const getCurrentUser =
  (cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const user = await authApi.getCurrentUser();
      if (!user) {
        cb();
        return;
      }
      const fetchUser = await authApi.getFirestoreUser(user.uid);

      const payload = {
        user: {
          ...fetchUser,
          id: user.uid,
          emailVerified: user.emailVerified,
        },
        token: {
          access: await user.getIdToken(true),
          refresh: user.refreshToken,
          expirationTime: (await user.getIdTokenResult()).expirationTime,
        },
      };

      dispatch(authActions.setUser(payload));

      cb();
    } catch (error: any) {
      cb(error);
    }
  };

export const addDriverVehicle =
  (type: driverVehicle, cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;
    if (!user) {
      return;
    }

    try {
      const data = await authApi.addDriverCar(
        addCreateHistory({ ...type, isActive: false, driver: user.id }, user),

        uuidv4()
      );
      dispatch(authActions.addDriverVehicles(data));
      cb?.();
    } catch (error) {
      cb?.(null);
    }
  };
export const getVehicleTypeById = (id: string, cb: Function) => async () => {
  try {
    const users = await authApi.getVehicleTypeById(id);

    cb(users);
  } catch (error) {
    cb?.();
  }
};

export const getVehicleTypes = (cb: Function) => async () => {
  try {
    const users = await authApi.getVehicleTypes();

    cb(users);
  } catch (error) {
    cb?.([]);
  }
};

export const uploadFiles = (files: FileList, cb: Function) => async () => {
  try {
    const res = await authApi.uploadFilesStorage(files);

    cb(res);
  } catch (error) {
    cb?.([]);
  }
};
export const getRiderVehicles =
  (cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;
    try {
      if (!user) {
        return;
      }
      const orders = await authApi.getRiderVehicles(user?.id);
      dispatch(authActions.setAllDriverVehicles(orders));
      cb?.();
    } catch (error) {
      cb?.(null);
    }
  };
export const setLiveChatSession =
  (data: chatSession, cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const id = data?.id;

      const res = await authApi.setLiveChatSessionDatabase(data, id);

      cb?.(res);
    } catch (error) {
      cb?.(error);
    }
  };

export const updateChatSessionById =
  (data: chatSession, id: string, cb: Function) => async () => {
    try {
      const details = await authApi.updateChatSessionById(data, id);

      cb?.(details);
    } catch (error) {
      cb?.(null);
    }
  };

export const userRegister =
  (user: userState, cb: Function) => async (dispatch: AppDispatch) => {
    const updatedUser = createDisplayName(user);
    const payload = {
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      password: updatedUser.password,
      phoneNumber: updatedUser.phoneNumber,
    };
    try {
      const { data }: any = await authApi.createUserAuth(payload);
      const id = data.id;
      let finalUser = {
        name: updatedUser.firstName + " " + updatedUser.lastName,

        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        isProved: false,
        role: "driver",
      };

      finalUser = addCreateHistory(finalUser, { id });
      const saveUser = await authApi.saveUserfirestore(finalUser, id);
      const { user } = await authApi.sigInWithEmailAndPassword(
        saveUser.email,
        updatedUser.password
      );
      const actionPayload = {
        user: {
          ...saveUser,
          id: user.uid,
          emailVerified: user.emailVerified,
        },
        token: {
          access: await user.getIdToken(true),
          refresh: user.refreshToken,
          expirationTime: (await user.getIdTokenResult()).expirationTime,
        },
      };
      dispatch(authActions.setUser(actionPayload));

      cb();
    } catch (error: any) {
      cb(error);
    }
  };

export const userLogout = (cb: Function) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authActions.logout());
    await authApi.logout();

    cb();
  } catch (error: any) {
    cb(error);
  }
};
export const updateUserPassword =
  (data: changePassProps, cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const user = await authApi.getCurrentUser();
      if (!user) {
        cb();
        return;
      }
      const updatedUser = await authApi.reAuthenticateUser(
        user,
        data.oldPassword
      );
      if (!updatedUser) {
        cb();
        return;
      }
      await authApi.changePassword(updatedUser, data.newPassword);
      await authApi.logout();
      dispatch(authActions.logout());

      cb();
    } catch (error: any) {
      cb(error);
    }
  };

export const verifyEmailCode =
  (values: { code: string }, cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const { data }: any = await authApi.verifyEmailCode(values);
      dispatch(authActions.updateUser(data));
      cb();
    } catch (error: any) {
      cb(error);
    }
  };
export const uploadAdditionalDocuments =
  (
    document: {
      files: FileList;
      fileName: string;
    },

    name: string,
    cb: Function
  ) =>
  async (_: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    try {
      if (!user) {
        cb();
        return;
      }
      const uploadedLinks = await authApi.uploadFilesStorage(document.files);
      let data = {
        [document.fileName]: uploadedLinks,
        name,
      };

      cb(data);
    } catch (error: any) {
      cb(error);
    }
  };
export const saveAdditionalDocuments =
  (state: additionalInfoContext, cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    try {
      const response = await Promise.all(
        Object.values(state).map(async (entry) => {
          let data = await authApi.addSubDoc(
            entry,
            user?.id!,
            "addtionalDocuments",
            uuidv4()
          );
          return data;
        })
      );
      dispatch(authActions.updateUser({ ...user, isDocumentsProvided: true }));
      cb(response, false);
    } catch (error: any) {
      cb(error, true);
    }
  };
export const RemoveAdditionalDocuments =
  (
    field: string,
    docId: string,

    cb: Function
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    try {
      if (!user) {
        cb();
        return;
      }
      const data = await authApi.removeSubDoc(
        user.id,
        docId,
        "addtionalDocuments",
        field
      );

      cb(data);
    } catch (error: any) {
      cb(error);
    }
  };
export const saveVehicleRequirments =
  (
    values: vehicleRequirmentsProps,
    name: string,
    docId: string,
    cb: Function
  ) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    try {
      if (!user) {
        cb();
        return;
      }
      let data: any;
      if (docId) {
        data = await authApi.updateSubDoc(
          { ...values, name },
          user.id,
          "addtionalDocuments",
          docId
        );
      } else {
        data = await authApi.addSubDoc(
          { ...values, name },
          user.id,
          "addtionalDocuments",
          uuidv4()
        );
      }

      cb(data);
    } catch (error: any) {
      cb(error);
    }
  };

export const resendEmailCode =
  (cb: Function) => async (dispatch: AppDispatch) => {
    try {
      const { data }: any = await authApi.resendEmailCode();
      dispatch(authActions.updateUser(data));
      cb();
    } catch (error: any) {
      cb(error);
    }
  };

export const getUserAdditionalInfo =
  (cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;
    try {
      if (!user) {
        cb();
        return;
      }
      const data: any = await authApi.getFirestoreUser(user.id);

      dispatch(authActions.updateUser(data));

      cb(data);
    } catch (error: any) {
      cb(error);
    }
  };

export const uploadProfileImage =
  (file: File, cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;
    try {
      if (!user) {
        return;
      }
      const link = await authApi.uploadFileStorage(file);

      await authApi.updateDocFirebase(user?.id, { profileImage: link });
      dispatch(authActions.updateUser({ profileImage: link }));
      cb();
    } catch (error: any) {}
  };
export const removeProfileImage =
  (cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    try {
      if (!user) {
        return;
      }
      await authApi.updateDocFirebase(user?.id, {
        profileImage: deleteField(),
      });

      dispatch(authActions.updateUser({ profileImage: null }));
      cb();
    } catch (error: any) {
      cb(error);
    }
  };
export const getLiveChatSessionByUser =
  (cb: (data: chatSession | null) => void) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { user } = getState().auth;
      if (!user) {
        return;
      }
      await authApi.getLiveChatSessionByUser("createdBy", user.id, (snap) => {
        if (snap.exists() && snap.val()) {
          const key = Object?.keys(snap?.val())?.[0];
          let session = {
            ...snap.val()?.[key],
            id: key,
          };

          cb?.(session);
        }

        cb(null);
      });
    } catch (error) {}
  };
export const updateUserProfile =
  (data: profileProps, cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    try {
      if (!user) {
        return;
      }
      const finalData = {
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
        name: data.firstName + " " + data.lastName,
      };

      if (user.email !== data.email) {
        await authApi.updateAuthEmail({ email: data.email });
      }

      await authApi.updateDocFirebase(user?.id, finalData);

      dispatch(authActions.updateUser(finalData));
      cb();
    } catch (error: any) {
      cb(error);
    }
  };

export const userLogin =
  (data: { email: string; password: string }, cb: Function) =>
  async (dispatch: AppDispatch) => {
    try {
      const { user } = await authApi.sigInWithEmailAndPassword(
        data.email,
        data.password
      );
      const fetchUser = await authApi.getFirestoreUser(user.uid);

      const payload = {
        user: {
          ...fetchUser,
          id: user.uid,
          emailVerified: user.emailVerified,
          provideDocuments: fetchUser.isDocumentsProvided,
        },
        token: {
          access: await user.getIdToken(true),
          refresh: user.refreshToken,
          expirationTime: (await user.getIdTokenResult()).expirationTime,
        },
      };

      dispatch(authActions.setUser(payload));

      cb();
    } catch (error: any) {
      cb(error);
    }
  };
export const saveAccountDetail =
  (payload: paymentForm, id: string, cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;
    if (!user) {
      cb();
      return;
    }
    try {
      if (id) {
        await authApi.updateSubDoc(payload, user?.id, "payment", id);
      } else {
        await authApi.addSubDoc(payload, user?.id, "payment", uuidv4());
      }
      cb();
    } catch (error: any) {
      cb(error);
    }
  };

export const getUserPayment =
  (cb: Function) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;
    if (!user) {
      cb();
      return;
    }
    try {
      const data = await authApi.getUserSubDoc(user?.id, "payment");

      cb(data[0]);
    } catch (error: any) {
      cb(error);
    }
  };
