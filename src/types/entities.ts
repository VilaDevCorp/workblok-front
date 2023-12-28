import { conf } from "./../conf";
export interface User {
  id: string;
  username: string;
  dans: number;
  tutorialCompleted: boolean;
  config: UserConfig;
}

export interface CreateBlockForm {
  targetMinutes: number;
  tag?: string;
}

export interface PenaltyForm {
  blockId: string;
  distractionMinutes?: number;
}

export interface SearchBlockForm {
  page: number;
  pageSize: number;
  creationDate?: Date;
  isActive?: boolean;
  tag?: string;
}

export interface DeleteBlockForm {
  blockIds: string[];
}

export interface RegisterUserForm {
  username: string;
  email: string;
  password: string;
}

export interface UserConfig {
  dailyTarget?: number;
  darkMode?: boolean;
  exceededTime?: boolean;
  timeLimit?: number;
  tags?: string[];
}

export interface UpdateConfigForm {
  conf?: UserConfig;
}

export interface Block {
  id: string;
  creationDate: Date;
  finishDate?: Date;
  targetMinutes: number;
  distractionMinutes: number;
  tag?: string;
}

export interface CreateVerificationCodeForm {
  type: "validate_account" | "recover_password";
  email: string;
}

export interface UseVerificationCodeForm {
  type: "validate_account" | "recover_password";
  email: string;
  code: string;
  newPass?: string;
}

export interface StatsForm {
  year?: number;
  month?: number;
  week?: number;
  day?: number;
}

export interface PeriodStats {
  workingTime: number;
  distractionTime: number;
}
type PeriodInfo = {
  [key: number]: PeriodStats;
};

export interface StatsResult {
  workingTime: number;
  distractionTime: number;
  dailyAvgWorkingTime: number;
  dailyAvgDistractionTime: number;
  realStartDate: string;
  realFinishDate: string;
  nWeeksOfMonth: number;
  yearInfo: PeriodInfo;
  monthInfo: PeriodInfo;
  weekInfo: PeriodInfo;
}
