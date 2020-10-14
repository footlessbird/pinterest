import * as actions from "./index";
import { ActionType } from "typesafe-actions";
import { TPin } from "./pin";
import { TUser } from "./auth";

export type PinterestAction = ActionType<typeof actions>;

export type PinState = {
  loading: boolean;
  error: Error | null;
  // data: TPin[] | null | undefined;
  // data: TPin[] | (TPin | TPin[])[];
  data: TPin[];
  hasMorePins: boolean;
};

// export type AuthState = {
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   isSuccessful: boolean;
//   user: TUser | null;
//   error: Error | null;
// };

export type AuthState = {
  getCurrentUserLoading: boolean;
  currentUser: TUser | null;
  getCurrentUserDone: boolean;
  getCurrentUserError: Error | null;

  localLoginLoading: boolean;
  localLoginUser: TUser | null;
  localLoginDone: boolean;
  localLoginError: Error | null;

  githubLoginLoading: boolean;
  githubLoginUser: TUser | null;
  githubLoginDone: boolean;
  githubLoginError: Error | null;

  registerUserLoading: boolean;
  registerUserDone: boolean;
  registerUserError: Error | null;

  // user: TUser | null;
};
