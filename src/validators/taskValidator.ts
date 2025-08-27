import joi from 'joi';
import {
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskColor,
} from '../utils/models';

export const taskFilterSchema = joi.object({
  color: joi
    .string()
    .valid(...Object.values(TaskColor))
    .optional(),
  completed: joi.boolean().optional(),
});

export const taskCreateSchema = joi.object<CreateTaskRequest>({
  title: joi.string().trim().min(1).required(),
  color: joi
    .string()
    .valid(...Object.values(TaskColor))
    .default(TaskColor.BLUE)
    .optional(),
});

export const taskUpdateSchema = joi
  .object<UpdateTaskRequest>({
    title: joi.string().trim().min(1).optional(),
    color: joi
      .string()
      .valid(...Object.values(TaskColor))
      .optional(),
    completed: joi.boolean().optional(),
  })
  .or('title', 'color', 'completed');

export const taskIdSchema = joi.object({
  id: joi.string().trim().uuid().required(),
});
