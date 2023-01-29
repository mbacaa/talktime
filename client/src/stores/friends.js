import { atom } from "nanostores";
import { USER_DATA } from "../stores/userData";
import { axiosConfig } from "../utils/axiosConfig";

export const FRIENDS = atom([]);

export const updateFriends = async () => {
  try {
    const response = await axiosConfig.get(
      `/users/${USER_DATA.get()._id}/friends`,
    );
    FRIENDS.set(response.data);
  } catch (error) {
    console.log(error);
  }
};
