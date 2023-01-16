export interface Page<T> {
  page: number;
  totalPages: number;
  content: T[];
}

export enum StateEnum {
  BORRADOR = "borrador",
  ENVIADA = "enviada",
}

export enum RolEnum {
  USUARIO = "usuario",
  ADMIN = "admin",
  GESTOR = "gestor",
}

export enum SizeEnum {
  XS,
  S,
  M,
  L,
  XL,
  M_VERTICAL
}

export enum ButtonTypeEnum {
  SAVE,
  CANCEL,
  EDIT,
  DELETE,
  CONFIRM,
}

export enum ButtonStyleEnum {FILLED, OUTLINE}


export enum IconTypeEnum {
    PREVIOUS,
    NEXT,
    LOGOUT,
    CANCEL,
    CONFIRM,
    CLOSE,
    USER,
    ADD,
    LOGIN,
    DELETE,
    EDIT,
    SEARCH
}

export enum ActivityIconTypeEnum {
    RUNNING='running',
    LIFTING='lifting',
    BIKE='bike',
    FOOTBALL='football',
    BOXING='boxing',
    RUGBY='rugby',
    WALK='walk'
}


export enum ColorEnum {
  DANGER='danger'
}

export interface SelectOption {
  label:string
  value:string
}


export interface ContextOption {
  type: IconTypeEnum;
  label:string;
  onClick: (id:string) => void;
}

export interface ModalButton {
  type: IconTypeEnum;
  onClick: () => void;
  label?:string
}


export enum ModalType {
    SELECT_ACTIVITY,
    CREATE_ACTIVITY
}
