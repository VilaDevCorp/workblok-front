export interface User {
  id: string;
  username: string;
  dans: number;
  tutorialCompleted: boolean;
}

export interface CreateBlockForm {
  targetMinutes: number;
}

export interface PenaltyForm {
  blockId: string;
  distractionMinutes?: number;
}

export interface SearchBlockForm {
  page: number;
  pageSize: number;
  startDate?: Date;
  isActive?: boolean;
}

export interface DeleteBlockForm {
  blockIds: string[];
}

export interface RegisterUserForm {
  username: string;
  email: string;
  password: string;
}

export interface Block {
  id: string;
  creationDate: Date;
  finishDate?: Date;
  targetMinutes: number;
  distractionMinutes: number;
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
