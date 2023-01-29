import { atom } from "nanostores";

export const USER_DATA = atom(null);
export const JWT = atom(null);

export const updateUserData = (data, token) => {
  USER_DATA.set(data);
  JWT.set(token);
};
