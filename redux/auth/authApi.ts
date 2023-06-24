import { Auth, User } from "firebase/auth";
import { DataSnapshot } from "firebase/database";
import {
  CollectionReference,
  deleteField,
  DocumentData,
  where,
} from "firebase/firestore";
import {
  CHAT_COLLECTION,
  DRIVER_COLLECTION,
  VEHICLES_COLLECTION,
  VEHICLES_TYPES_COLLECTION,
} from "../../config";
import { INSTANCE } from "../../config/axiosInstance";
import { auth, database, firestore, storage } from "../../firebase/app";
import {
  signInWithEmailAndPass,
  userLogout,
  userReauthenticate,
  userUpdatePassword,
} from "../../firebase/auth";
import {
  onValueChangeByChildDatabase,
  saveDatabaseDoc,
  updateDatabaseDoc,
} from "../../firebase/database";
import {
  getFirstoreColection,
  getFirstoreDoc,
  getFirstoreDocs,
  getFirstoreSubDocs,
  setFirestoreDoc,
  setFirstoreSubDoc,
  updateFirebaseDoc,
  updateFirstoreSubDoc,
} from "../../firebase/firestore";
import {
  getDownloadUrl,
  getStorageRef,
  uploadBytesStorage,
  uploadByteStorage,
} from "../../firebase/storage";
import { chatSession, driverVehicle } from "../../interfaces";

export default class AuthApi {
  private colectionRef: CollectionReference;
  private vehicleTypeColectionRef: CollectionReference;
  private vehicleColectionRef: CollectionReference;

  private authRef: Auth;
  constructor(
    colectionRef = getFirstoreColection(firestore, DRIVER_COLLECTION),
    vehicleTypeColectionRef = getFirstoreColection(
      firestore,
      VEHICLES_TYPES_COLLECTION
    ),
    vehicleColectionRef = getFirstoreColection(firestore, VEHICLES_COLLECTION),
    authRef = auth
  ) {
    this.colectionRef = colectionRef;
    this.authRef = authRef;
    this.vehicleTypeColectionRef = vehicleTypeColectionRef;
    this.vehicleColectionRef = vehicleColectionRef;
  }

  public async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(resolve, reject);
    });
  }

  updateChatSessionById = async (data: chatSession, id: string) => {
    const res = await updateDatabaseDoc(database, data, CHAT_COLLECTION, id);

    return res;
  };
  public async reAuthenticateUser(user: User, password: string) {
    const authenticated = await userReauthenticate(user, password);
    return authenticated;
  }
  public async getRiderVehicles(userId: string) {
    const docs = await getFirstoreDocs(this.vehicleColectionRef, [
      where("driver", "==", userId),
    ]);
    return docs.empty
      ? []
      : docs.docs.map((e) => {
          return {
            ...e.data(),
            id: e.id,
          };
        });
  }
  public async addDriverCar(
    data: driverVehicle,

    docId: string
  ) {
    await setFirestoreDoc(
      this.vehicleColectionRef,

      docId,
      data
    );

    return {
      ...data,
      id: docId,
    };
  }
  public async getVehicleTypeById(docId: string) {
    const res = await getFirstoreDoc(this.vehicleTypeColectionRef, docId);
    return res.exists()
      ? {
          ...res.data(),
          id: res.id,
        }
      : null;
  }
  public async changePassword(user: User, password: string) {
    const authenticated = await userUpdatePassword(user, password);
    return authenticated;
  }

  public async uploadFileStorage(file: File): Promise<string | null> {
    const storageRef = getStorageRef(storage, `images/${file.name}`);
    const uploadTask = await uploadByteStorage(storageRef, file);
    const link = await getDownloadUrl(uploadTask.ref);
    return link;
  }
  public async uploadFilesStorage(files: FileList): Promise<string[] | null> {
    const uploadTasks = await uploadBytesStorage(files);
    const links = await Promise.all(
      uploadTasks.map(async (uploadTask) => {
        const link = await getDownloadUrl(uploadTask.ref);
        return link;
      })
    );
    return links;
  }

  public async removeSubDoc(
    userId: string,
    docId: string,
    name: string,
    field: string
  ): Promise<any> {
    await updateFirstoreSubDoc(this.colectionRef, userId, [name, docId], {
      [field]: deleteField(),
      isCompleted: false,
    });

    return {
      docId,
      field,
    };
  }
  public async updateDocFirebase(
    id: string,
    data: any
  ): Promise<Object | null> {
    await updateFirebaseDoc(this.colectionRef, id, data);

    return {
      ...data,
    };
  }

  public async emailIsExist(data: { email: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user/checkEmail",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async checkPhoneNumber(data: { phoneNumber: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user/checkPhoneNumber",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  public async updateAuthEmail(data: { email: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user/updateEmail",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async verifyEmailCode(data: { code: string }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/user/verify-email",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async resendEmailCode() {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "GET",
        url: "/user/send-verify-email",
      })
        .then(resolve)
        .catch(reject);
    });
  }
  public async createUserAuth(data: {
    email: string;
    password: string;
    displayName: string;
    phoneNumber: string;
  }) {
    return new Promise((resolve, reject) => {
      INSTANCE({
        method: "POST",
        url: "/driver",
        data,
      })
        .then(resolve)
        .catch(reject);
    });
  }

  public async saveUserfirestore<TData extends DocumentData>(
    data: TData,
    id: string
  ): Promise<TData> {
    await setFirestoreDoc(this.colectionRef, id, data);

    return data;
  }
  setLiveChatSessionDatabase = async (data: chatSession, id: string) => {
    const res = await saveDatabaseDoc(database, data, CHAT_COLLECTION, id);

    return res;
  };
  public async sigInWithEmailAndPassword(email: string, password: string) {
    const user = await signInWithEmailAndPass(this.authRef, email, password);
    return user;
  }
  public async getFirestoreUser(id: string) {
    const user = await getFirstoreDoc(this.colectionRef, id);
    const data = user.data();
    const additionalDocuments = await this.getUserSubDoc(
      id,
      "addtionalDocuments"
    );

    return {
      ...data,
      isDocumentsProvided: additionalDocuments.length > 0,
    };
  }
  public async logout() {
    const user = await userLogout(this.authRef);
    return user;
  }
  public async addSubDoc(data: any, id: string, name: string, docId: string) {
    await setFirstoreSubDoc(this.colectionRef, id, [name, docId], { ...data });
    return {
      ...data,

      id: docId,
    };
  }

  public async updateSubDoc(
    data: any,
    id: string,
    name: string,
    docId: string
  ) {
    await updateFirstoreSubDoc(this.colectionRef, id, [name, docId], data);
    return {
      ...data,

      id: docId,
    };
  }

  getLiveChatSessionByUser = async (
    orderBy: string,
    id: string,
    onSuccess: (snap: DataSnapshot) => void
  ) => {
    onValueChangeByChildDatabase(
      database,
      CHAT_COLLECTION,
      orderBy,
      id,
      onSuccess
    );
  };
  public async getUserSubDoc(id: string, name: string) {
    const getDocs = await getFirstoreSubDocs(this.colectionRef, id, [name], []);

    return getDocs.empty
      ? []
      : getDocs.docs.map((doc) => {
          return {
            ...doc.data(),

            id: doc.id,
          };
        });
  }

  getVehicleTypes = async () => {
    const doc = await getFirstoreDocs(this.vehicleTypeColectionRef, [
      where("isActive", "==", true),
    ]);

    return doc.empty
      ? []
      : doc.docs.map((e) => {
          return {
            ...e.data(),
            id: e.id,
          };
        });
  };
}
