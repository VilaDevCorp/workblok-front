import { atom } from "recoil";
import { ColorEnum, IconTypeEnum, ModalType } from "../types/types";

export const isLoading = atom<boolean>({
  key: "isLoading",
  default: false,
});

export interface SnackAtomProps {
  visible: boolean;
  text?: string;
  icon?: IconTypeEnum;
  color?: ColorEnum;
}

export const snackAtom = atom<SnackAtomProps>({
  key: "snackAtom",
  default: {
    visible: false,
    text: "Elemento borrado correctamente",
    icon: IconTypeEnum.DELETE,
    color: ColorEnum.DANGER,
  },
});

export const clearContextAtom = atom<boolean>({
  key: "clearContextAtom",
  default: false,
});

export const selectedActivitiesAtom = atom<string[]>({
  key: "selectedActivitiesAtom",
  default: [],
});
// export interface FamiliarModalProps {
//   visible: boolean;
//   familiarId?: string | undefined;
// }
// export const familiarModal = atom<FamiliarModalProps>({
//   key: "familiarModal",
//   default: { visible: false },
// });
