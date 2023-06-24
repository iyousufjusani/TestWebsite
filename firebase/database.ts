import {
  ref,
  onValue,
  Database,
  DataSnapshot,
  set,
  update,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";

export const onValueChangeByChildDatabase = (
  db: Database,

  collection: string,
  orderBy: string,
  eqTo: string,
  onSuccess: (snap: DataSnapshot) => void,
  onError?: (error: Error) => void
) => {
  const pathRef = query(
    ref(db, `${collection}/`),
    orderByChild(orderBy),
    equalTo(eqTo)
  );
  onValue(pathRef, onSuccess, onError);
};
export const saveDatabaseDoc = async <TData>(
  db: Database,

  data: TData,
  collection: string,
  id: string
): Promise<TData> => {
  const dataRef = ref(db, collection + "/" + id);
  await set(dataRef, data);
  return {
    ...data,
    id,
  };
};
export const updateDatabaseDoc = async <TData>(
  db: Database,

  data: TData,
  collection: string,
  id: string
): Promise<TData> => {
  const updateRef = ref(db);

  const updates = {};
  updates[collection + "/" + id] = data;

  await update(updateRef, updates);
  return {
    ...data,
    id,
  };
};
