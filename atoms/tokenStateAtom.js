import { atom } from "recoil";

export const tokenStateAtom = atom({
  key: "tokenState", // unique ID (with respect to other atoms/selectors)
  default: {
    access_token: null,
    user: null,
  }, // default value (aka initial value)
});
