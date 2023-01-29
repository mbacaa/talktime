import { atom } from "nanostores";

export const DARK_MODE = atom(false);

export const updateDarkMode = () => {
  DARK_MODE.set(!DARK_MODE.get());
};
