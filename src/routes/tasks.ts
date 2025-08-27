import { Router } from 'express';
import { validateRequest } from '../middlewares/validationMiddleware';
import {
  taskCreateSchema,
  taskFilterSchema,
  taskIdSchema,
  taskUpdateSchema,
} from '../validators/taskValidator';
import { TaskController } from '../controllers/taskController';

const router = Router();
const taskController = new TaskController();

// Get all tasks
router.get(
  '/',
  validateRequest(taskFilterSchema, 'query'),
  taskController.getTasks
);

// Create a new task
router.post(
  '/',
  validateRequest(taskCreateSchema, 'body'),
  taskController.createTask
);

// Update a task
router.put(
  '/:id',
  validateRequest(taskIdSchema, 'params'),
  validateRequest(taskUpdateSchema, 'body'),
  taskController.updateTask
);

// Delete a task
router.delete(
  '/:id',
  validateRequest(taskIdSchema, 'params'),
  taskController.deleteTask
);

export default router;
