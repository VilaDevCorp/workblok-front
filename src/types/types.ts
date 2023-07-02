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
  M_VERTICAL,
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface Page<T> {
  page: number;
  totalPages: number;
  content: T[];
}
export type ThemeColors = "primary" | "seconday";



export interface ApiResponse<T> {
	message: string      
	obj:     T 
	err:     string       
	errCode: string      
}

export class ApiError extends Error {
  message: string;
  cause: number;
  errCode?: string;

  constructor({
    message,
    cause,
    errCode,
  }: {
    message: string;
    cause: number;
    errCode?: string;
  }) {
    super();
    this.message = message;
    this.cause = cause;
    this.errCode = errCode;
  }
}
