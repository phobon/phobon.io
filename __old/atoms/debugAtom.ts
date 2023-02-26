import { atom } from "jotai";

export interface IDebugAtom {
  showGrid: boolean;
}

export const debugAtom = atom<IDebugAtom>({ showGrid: false });
