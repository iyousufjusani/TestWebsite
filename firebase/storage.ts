import {
  FirebaseStorage,
  getDownloadURL,
  ref,
  StorageReference,
  StringFormat,
  uploadBytes,
  uploadBytesResumable,
  UploadMetadata,
  UploadResult,
  uploadString,
} from "firebase/storage";
import { storage } from "./app";
export const getStorageRef = (storage: FirebaseStorage, storageUrl: string) => {
  const storageRef = ref(storage, storageUrl);
  return storageRef;
};

export const uploadByteStorage = async (
  storageRef: StorageReference,
  byte: Uint8Array | Blob | ArrayBuffer,
  metadata?: UploadMetadata
) => {
  const uploadTask = await uploadBytes(storageRef, byte, metadata);
  return uploadTask;
};

export const uploadBytesStorage = async (
  files: FileList,
  metadata?: UploadMetadata
) => {
  const uploadTasks: UploadResult[] = [];

  for (let index = 0; index < files.length; index++) {
    const file = files.item(index);

    if (file) {
      const storageRef = getStorageRef(storage, `images/${file.name}`);
      const uploadTask = await uploadBytes(storageRef, file, metadata);

      uploadTasks.push(uploadTask);
    }
  }

  return uploadTasks;
};
export const uploadBytesResumableStorage = async (
  storageRef: StorageReference,
  bytes: Uint8Array | Blob | ArrayBuffer,
  metadata?: UploadMetadata
) => {
  const uploadTask = uploadBytesResumable(storageRef, bytes, metadata);
  return uploadTask;
};
export const uploadStringStorage = async (
  storageRef: StorageReference,
  message: string,
  format?: StringFormat,
  metaData?: UploadMetadata
) => {
  const uploadTask = await uploadString(storageRef, message, format, metaData);
  return uploadTask;
};

export const getDownloadUrl = async (storageRef: StorageReference) => {
  const link = await getDownloadURL(storageRef);
  return link;
};
