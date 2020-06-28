import * as actions from "./index";
import { ActionType } from "typesafe-actions";
import { TPin } from "./pin";

export type PinterestAction = ActionType<typeof actions>;

export type PinState = {
  loading: boolean;
  error: Error | null;
  data: TPin[] | null | undefined;
};
