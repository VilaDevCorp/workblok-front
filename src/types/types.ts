export interface SelectOption {
  label: string;
  value: string;
}

export interface Page<T> {
  page: number;
  totalPages: number;
  content: T[];
}

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
