import moment from "moment";
import React, { createContext, ReactNode, useContext } from "react";
import StatusCode from "status-code-enum";
import {
  Block,
  CreateBlockForm,
  CreateVerificationCodeForm,
  PenaltyForm,
  RegisterUserForm,
  SearchBlockForm,
  UseVerificationCodeForm,
} from "../types/entities";
import { ApiError, ApiResponse, Page } from "../types/types";
import { useAuth } from "./useAuth";

export interface ApiContext {
  register: (user: RegisterUserForm) => void;
  useVerificationCode: (form: UseVerificationCodeForm) => Promise<void>;
  sendVerificationCode: (form: CreateVerificationCodeForm) => Promise<void>;
  createBlock: (form: CreateBlockForm) => Promise<void>;
  applyPenalty: (form: PenaltyForm) => Promise<void>;
  finishBlock: (blockId: string) => Promise<void>;
  getBlock: (id: string) => Promise<Block>;
  searchBlocks: (form: SearchBlockForm) => Promise<Page<Block>>;
}

const ApiContext = createContext<ApiContext>({} as any);

export const useApi = () => {
  const ctx = useContext(ApiContext);
  if (ctx === null) {
    throw new Error(
      "useApi() can only be used on the descendants of ApiProvider"
    );
  } else {
    return ctx;
  }
};

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const { user, csrfToken } = useAuth();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  const register = async (user: RegisterUserForm) => {
    const url = `${apiUrl}public/register`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    let result = [];
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<unknown> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  const sendVerificationCode = async (
    form: CreateVerificationCodeForm
  ): Promise<void> => {
    const url = `${apiUrl}public/newVerificationCode`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(form),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    let result = [];
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<unknown> = await res.json();
      if (!res.ok) {
        throw new Error();
      }
    } catch (e) {
      throw e;
    }
  };

  const useVerificationCode = async (
    form: UseVerificationCodeForm
  ): Promise<void> => {
    const url = `${apiUrl}public/useVerificationCode`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(form),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    let result = [];
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<unknown> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  const createBlock = async (block: CreateBlockForm): Promise<void> => {
    const url = `${apiUrl}private/block`;
    const options: RequestInit = {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(block),
      headers: new Headers({
        "content-type": "application/json",
        "X-API-CSRF": csrfToken ? csrfToken : "",
      }),
    };
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<unknown> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  const applyPenalty = async (penalty: PenaltyForm): Promise<void> => {
    const url = `${apiUrl}private/block/penalty`;
    const options: RequestInit = {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(penalty),
      headers: new Headers({
        "X-API-CSRF": csrfToken ? csrfToken : "",
        "content-type": "application/json",
      }),
    };
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<unknown> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  const finishBlock = async (blockId: string): Promise<void> => {
    const url = `${apiUrl}private/block/${blockId}/finish`;
    const options: RequestInit = {
      credentials: "include",
      method: "POST",
      headers: new Headers({
        "X-API-CSRF": csrfToken ? csrfToken : "",
      }),
    };
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<unknown> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  const getBlock = async (id: string): Promise<Block> => {
    const url = `${apiUrl}private/block/${id}`;
    const options: RequestInit = {
      credentials: "include",
      method: "GET",
      headers: new Headers({
        "X-API-CSRF": csrfToken ? csrfToken : "",
        "content-type": "application/json",
      }),
    };
    let result: Block | undefined = undefined;
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<Block> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
      result = resObject.obj;
    } catch (e) {
      throw e;
    }
    return result;
  };

  const searchBlocks = async (form: SearchBlockForm): Promise<Page<Block>> => {
    const url = `${apiUrl}private/block/search`;
    const options: RequestInit = {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(form),
      headers: new Headers({
        "X-API-CSRF": csrfToken ? csrfToken : "",
        "content-type": "application/json",
      }),
    };
    let result: any;
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<unknown> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
      result = resObject.obj;
    } catch (e) {
      throw e;
    }
    return result;
  };

  const deleteActivities = async (ids: string[]): Promise<void> => {
    const url = `${apiUrl}private/block`;
    const options: RequestInit = {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({ blockIds: ids }),
      headers: new Headers({
        "X-API-CSRF": csrfToken ? csrfToken : "",
        "content-type": "application/json",
      }),
    };
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<unknown> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  const value: ApiContext = {
    register,
    sendVerificationCode,
    useVerificationCode,
    finishBlock,
    createBlock,
    applyPenalty,
    getBlock,
    searchBlocks,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
