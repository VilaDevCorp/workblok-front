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
  description: string;
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
