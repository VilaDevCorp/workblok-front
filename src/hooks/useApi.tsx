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
  StatsForm,
  StatsResult,
  UpdateConfigForm,
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
  finishBlock: (blockId: string, auto?: boolean) => Promise<void>;
  getBlock: (id: string) => Promise<Block>;
  searchBlocks: (form: SearchBlockForm) => Promise<Page<Block>>;
  deleteBlocks: (ids: string[]) => Promise<void>;
  getStats: (form: StatsForm) => Promise<StatsResult>;
  updateConf: (form: UpdateConfigForm) => Promise<void>;
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

  const finishBlock = async (
    blockId: string,
    auto?: boolean
  ): Promise<void> => {
    const url = `${apiUrl}private/block/${blockId}/finish${
      auto ? "?auto=true" : ""
    }`;
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

  const updateConf = async (form: UpdateConfigForm): Promise<void> => {
    const url = `${apiUrl}private/user/conf`;
    const options: RequestInit = {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(form),
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

  const deleteBlocks = async (ids: string[]): Promise<void> => {
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

  const getStats = async (form: StatsForm): Promise<StatsResult> => {
    const url = `${apiUrl}private/block/stats`;
    const options: RequestInit = {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(form),
      headers: new Headers({
        "X-API-CSRF": csrfToken ? csrfToken : "",
        "content-type": "application/json",
      }),
    };
    try {
      const res = await fetch(url, options);
      const resObject: ApiResponse<StatsResult> = await res.json();
      if (!res.ok) {
        throw new ApiError({
          cause: res.status,
          message: resObject.message,
          errCode: resObject.errCode,
        });
      }
      return resObject.obj;
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
    deleteBlocks,
    getStats,
    updateConf,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
