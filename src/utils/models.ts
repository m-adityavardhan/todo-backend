export interface CreateTaskRequest {
  title: string;
  color?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  color?: string;
  completed?: boolean;
}

export type requestProperties = 'body' | 'query' | 'params';

/* eslint-disable no-unused-vars */
export enum TaskColor {
  RED,
  ORANGE,
  YELLOW,
  GREEN,
  BLUE,
  PURPLE,
  PINK,
  BROWN,
}
 
