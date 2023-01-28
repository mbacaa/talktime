import { atom } from "nanostores";

export const USER_DATA = atom({});
export const JWT = atom("");

export const updateUserData = (data, token) => {
  USER_DATA.set(data);
  JWT.set(token);
};
