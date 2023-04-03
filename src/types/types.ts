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

export interface SelectOption {
  label:string
  value:string
}

export interface Page<T> {
  page: number;
  totalPages: number;
  content: T[];
}




