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
  taskController.getTasks.bind(taskController)
);

// Create a new task
router.post(
  '/',
  validateRequest(taskCreateSchema, 'body'),
  taskController.createTask.bind(taskController)
);

// Update a task
router.put(
  '/:id',
  validateRequest(taskIdSchema, 'params'),
  validateRequest(taskUpdateSchema, 'body'),
  taskController.updateTask.bind(taskController)
);

// Delete a task
router.delete(
  '/:id',
  validateRequest(taskIdSchema, 'params'),
  taskController.deleteTask.bind(taskController)
);

export default router;
