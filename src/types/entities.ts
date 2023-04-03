import { ActivityIconTypeEnum } from "../components/atom/ActivityIcon";

export interface User {
  id: string;
  userName: string;
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
  icon?: ActivityIconTypeEnum;
  size:number
}

export interface RegisterUserForm {
  username: string
  mail:string
  password: string
}

export interface CreateActivityForm {
  name: string
  size: number
  icon?: ActivityIconTypeEnum
  userId: string
}

export interface UpdateActivityForm {
  id:string
  name: string
  icon?: ActivityIconTypeEnum
  size: number
}

export interface Task {
  id: string;
  activity: Activity;
  dueDate: Date
  userId:string;
  completed:boolean
}

export interface CreateTaskForm {
  activityId: string
  dueDate: string
  userId: string
}

export interface UpdateTaskForm {
  id:string
  completed:boolean;
}



