import { UserConfig } from "./types/entities";

const dateTimeFormat = "DD/MM/yyyy HH:mm::ss";
const dateFormat = "DD/MM/yyyy";
const dateUrlFormat = "DD-MM-yyyy";
const dateInputFormat = "YYYY-MM-DD";

const defaultUserConfig: UserConfig = {
  dailyTarget: 0,
  darkMode: false,
  exceededTime: true,
  timeLimit: 120,
};

export const conf = {
  dateFormat,
  dateUrlFormat,
  dateInputFormat,
  dateTimeFormat,
  defaultUserConfig,
};
