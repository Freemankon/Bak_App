import { createContext } from "react";

export const NearContext = createContext({
  wallet: undefined,
  signedAccountId: "",
});
