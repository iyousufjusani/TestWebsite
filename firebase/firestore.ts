import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  getDocs,
  query,
  QueryConstraint,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";

export const getFirstoreColection = (firestore: Firestore, name: string) => {
  return collection(firestore, name);
};

export const getFirstoreDocs = async (
  colectionRef: CollectionReference<DocumentData>,
  queryConstraint: QueryConstraint[]
) => {
  const q = query(colectionRef, ...queryConstraint);

  const docs = await getDocs(q);
  return docs;
};
export const getFirstoreDoc = async (
  colectionRef: CollectionReference<DocumentData>,
  docId: string
) => {
  const docRef = doc(colectionRef, docId);
  const docSnap = await getDoc(docRef);
  return docSnap;
};
export const setFirstoreSubDoc = async <TData extends DocumentData>(
  colectionRef: CollectionReference<DocumentData>,
  docId: string,
  pathSegments: string[],
  data: TData
) => {
  const docRef = doc(colectionRef, docId, ...pathSegments);
  const docSnap = await setDoc(docRef, data);
  return docSnap;
};
export const updateFirstoreSubDoc = async <TData extends DocumentData>(
  colectionRef: CollectionReference<DocumentData>,
  docId: string,
  pathSegments: string[],
  data: TData
) => {
  const docRef = doc(colectionRef, docId, ...pathSegments);
  const docSnap = await updateDoc(docRef, data);
  return docSnap;
};

export const getFirstoreSubDocs = async <TData>(
  colectionRef: CollectionReference<DocumentData>,
  docId: string,
  pathSegments: string[],
  queryConstraint: QueryConstraint[]
) => {
  const docRef = collection(colectionRef, docId, ...pathSegments);
  const q = query(docRef, ...queryConstraint);

  const docSnap = await getDocs(q);
  return docSnap;
};
export const setFirestoreDoc = async <TData>(
  colectionRef: CollectionReference<TData>,

  docId: string,
  data: TData
): Promise<TData> => {
  data = {
    ...data,
    createdAt: moment().toISOString(),
  };
  const docRef = doc(colectionRef, docId);
  await setDoc(docRef, data);

  return data;
};

export const updateFirebaseDoc = async <TData extends DocumentData>(
  colectionRef: CollectionReference<DocumentData>,
  docId: string,

  data: TData
) => {
  const docRef = doc(colectionRef, docId);
  const docSnap = await updateDoc(docRef, data);
  return docSnap;
};

export const deleteFirebaseDoc = async (
  colectionRef: CollectionReference<DocumentData>,
  docId: string
) => {
  const docRef = doc(colectionRef, docId);
  const docSnap = await deleteDoc(docRef);
  return docSnap;
};
