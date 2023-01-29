import { atom } from "nanostores";
import { axiosConfig } from "../utils/axiosConfig";

export const USERS = atom([]);

export const updateUsers = async () => {
  try {
    const response = await axiosConfig.get(`/users`);
    USERS.set(response.data);
  } catch (error) {
    console.log(error);
  }
};
