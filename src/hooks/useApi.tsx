import moment from "moment";
import { createContext, ReactNode, useContext } from "react";
import {
  Block,
  CreateBlockForm,
  PenaltyForm,
  RegisterUserForm,
  SearchBlockForm,
  StatsForm,
  StatsResult,
  UpdateConfigForm,
} from "../types/entities";
import { ApiResponse, Page } from "../types/types";
import { useAuth } from "./useAuth";
import { checkResponseException } from "../utils/utilFunctions";

export interface ApiContext {
  register: (user: RegisterUserForm) => void;
  sendValidationCode: (email: string) => Promise<void>;
  validateAccount: (email: string, code: string) => Promise<void>;
  forgottenPassword: (email: string) => Promise<void>;
  resetPassword: (
    email: string,
    code: string,
    password: string
  ) => Promise<void>;
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
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const { fetchWithAuth } = useAuth();

  const register = async (user: RegisterUserForm) => {
    const url = `${apiUrl}public/register`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(user),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const sendValidationCode = async (
    email: string
  ): Promise<void> => {
    const url = `${apiUrl}public/validate/${email}/resend`;
    const options: RequestInit = {
      method: "POST",
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<void> = await res.json();
    checkResponseException(res, resObject);

  };

  const validateAccount = async (
    email: string,
    code: string
  ): Promise<void> => {
    const url = `${apiUrl}public/validate/${email}/${code}`;
    const options: RequestInit = {
      method: 'POST'
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };


  const forgottenPassword = async (email: string): Promise<void> => {
    const url = `${apiUrl}public/forgotten-password/${email}`;
    const options: RequestInit = {
      method: 'POST'
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const resetPassword = async (
    email: string,
    code: string,
    password: string
  ): Promise<void> => {
    const url = `${apiUrl}public/reset-password/${email}/${code}`;
    const options: RequestInit = {
      method: 'POST',
      body: password,
      headers: new Headers({
        'content-type': 'text/plain'
      })
    };
    const res = await fetch(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const createBlock = async (block: CreateBlockForm): Promise<void> => {
    const url = `${apiUrl}private/block`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(block),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    const res = await fetchWithAuth(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const applyPenalty = async (penalty: PenaltyForm): Promise<void> => {
    const url = `${apiUrl}private/block/penalty`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(penalty),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    const res = await fetchWithAuth(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const finishBlock = async (
    blockId: string,
    auto?: boolean
  ): Promise<void> => {
    const url = `${apiUrl}private/block/${blockId}/finish${auto ? "?auto=true" : ""
      }`;
    const options: RequestInit = {
      method: "POST",
      headers: new Headers({
      }),
    };
    const res = await fetchWithAuth(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const updateConf = async (form: UpdateConfigForm): Promise<void> => {
    const url = `${apiUrl}private/user/conf`;
    const options: RequestInit = {
      method: "PATCH",
      body: JSON.stringify(form),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    const res = await fetchWithAuth(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const getBlock = async (id: string): Promise<Block> => {
    const url = `${apiUrl}private/block/${id}`;
    const options: RequestInit = {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    const res = await fetchWithAuth(url, options);
    const resObject: ApiResponse<Block> = await res.json();
    checkResponseException(res, resObject);
    return resObject.data;
  };

  const searchBlocks = async (form: SearchBlockForm): Promise<Page<Block>> => {
    const url = `${apiUrl}private/block/search`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(form),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    const res = await fetchWithAuth(url, options);
    const resObject: ApiResponse<Page<Block>> = await res.json();
    checkResponseException(res, resObject);
    return resObject.data;
  };

  const deleteBlocks = async (ids: string[]): Promise<void> => {
    const url = `${apiUrl}private/block`;
    const options: RequestInit = {
      method: "DELETE",
      body: JSON.stringify({ blockIds: ids }),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    const res = await fetchWithAuth(url, options);
    const resObject: ApiResponse<unknown> = await res.json();
    checkResponseException(res, resObject);
  };

  const getStats = async (form: StatsForm): Promise<StatsResult> => {
    const url = `${apiUrl}private/block/stats`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify(form),
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    const res = await fetchWithAuth(url, options);
    const resObject: ApiResponse<StatsResult> = await res.json();
    checkResponseException(res, resObject);
    return resObject.data;
  };

  const value: ApiContext = {
    register,
    sendValidationCode,
    validateAccount,
    forgottenPassword,
    resetPassword,
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
