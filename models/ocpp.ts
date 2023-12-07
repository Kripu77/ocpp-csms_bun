import { ActionType } from "./ActionType";

export interface OCPPType2Message {
  0: number;
  1: string;
  2: ActionType;
  3: Record<string, unknown>;
}
