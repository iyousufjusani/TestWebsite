import moment from "moment";

export const createDisplayName = <
  tUser extends { firstName: string; lastName: string }
>(
  user: tUser
) => {
  return {
    ...user,
    displayName: `${user.firstName} ${user.lastName}`,
  };
};
export const addCreateHistory = <tData, TUser extends { id: string }>(
  data: tData,
  user: TUser
) => {
  return {
    ...data,
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
    createdBy: user.id,
    updatedBy: user.id,
  };
};
export const addUpdateHistory = <tData, TUser extends { id: string }>(
  data: tData,
  user: TUser
) => {
  return {
    ...data,

    updatedAt: moment().toISOString(),

    updatedBy: user.id,
  };
};
