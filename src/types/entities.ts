import { ActivityType } from "../components/atom/ActivityIcon";

export interface User {
  id: string;
  username: string;
  dans: number;
}

export interface Rol {
  id: string;
  name?: string;
}

export interface Test {
  id?: string;
  name?: string;
  lastname?: string;
  date?: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  icon?: ActivityType;
  size: number;
}

export interface RegisterUserForm {
  username: string;
  mail: string;
  password: string;
}

export interface CreateVerificationCodeForm {
  type: "validate_account" | "recover_password";
  mail: string;
}

export interface UseVerificationCodeForm {
  type: "validate_account" | "recover_password";
  mail: string;
  code: string;
  newPass?: string;
}

export interface CreateActivityForm {
  name: string;
  size: number;
  description: string;
  icon?: ActivityType;
  userId: string;
}

export interface UpdateActivityForm {
  id: string;
  name: string;
  description: string;
  icon?: ActivityType;
  size: number;
}

export interface Task {
  id: string;
  dueDate: Date;
  userId: string;
  completed: boolean;
  edges: TaskEdges;
}

interface TaskEdges {
  activity: Activity;
}

export interface CreateTaskForm {
  activityId: string;
  dueDate: string;
  userId: string;
}

export interface CompleteTaskForm {
  taskIds: string[];
  isCompleted: boolean;
}

interface TemplateEdges {
  templateTasks: TemplateTask[];
}

interface TemplateTaskEdges {
  activity: Activity;
}

export interface TemplateTask {
  id: string;
  weekDay: number;
  edges: TemplateTaskEdges;
}
export interface Template {
  id: string;
  name: string;
  edges: TemplateEdges;
}

export interface CreateTemplateForm {
  name: string;
  tasks: TemplateTask[];
  userId: string;
}

export interface UpdateTemplateForm {
  id: string;
  name?: string;
}

export interface CreateTemplateTaskForm {
  activityId: string;
  weekDay: number;
}

export interface ApplyTemplateForm {
  userId: string;
  startDate: string;
}

export interface StatsForm {
  userId: string;
  year?: number;
  month?: number;
  week?: number;
}

export interface ActivityStatElement {
  activityName: string;
  activityIcon?: string;
  nTimes: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface StatsResult {
  scheduledDans?: number;
  completedDans?: number;
  completedPercentage?: number;
  dailyAvgScheduled?: number;
  dailyAvgCompleted?: number;
  realStartDate: string;
  realFinishDate: string;
  nWeeksOfMonth?: number;
  activityInfo?: ActivityStatElement[];
}
