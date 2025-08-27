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

export enum TaskColor {
    RED = 'red',
    ORANGE = 'orange',
    YELLOW = 'yellow',
    GREEN = 'green',
    BLUE = 'blue',
    PURPLE = 'purple',
    PINK = 'pink',
    BROWN = 'brown'
}