import { ActivityIconTypeEnum } from "./types";

export interface User {
  id?: string;
  name?: string;
  pass?: string;
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

export interface CreateActivityForm {
  name: string
  size: number
  icon?: ActivityIconTypeEnum
  userId: string
}

export interface UpdateActivityForm {
  id:string
  name: string
  size: number
}

export interface Task {
  id: string;
  activity: Activity;
  dueDate: Date
  userId:string 
}

export interface CreateTaskForm {
  activityId: string
  dueDate: string
  userId: string
}



