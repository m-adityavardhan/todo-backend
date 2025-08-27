import { mockTasks, singleTask } from './mocks/mockTasks';
import { TaskService } from '../src/services/taskService';

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      task: {
        findMany: jest.fn().mockResolvedValue(mockTasks),
        create: jest.fn().mockResolvedValue(singleTask),
        findUnique: jest.fn().mockResolvedValue(mockTasks[0]),
        update: jest
          .fn()
          .mockResolvedValue({ ...singleTask, title: 'Updated' }),
        delete: jest.fn().mockResolvedValue(mockTasks[0]),
      },
    })),
  };
});

describe('taskService', () => {
  let service: TaskService;
  beforeAll(() => {
    service = new TaskService();
  });

  it('should get tasks', async () => {
    const tasks = await service.getTasks();
    expect(tasks).toEqual(mockTasks);
  });

  it('should create a task', async () => {
    const result = await service.createTask(singleTask.title, singleTask.color);
    expect(result).toEqual(singleTask);
  });

  it('should find a task by id', async () => {
    const result = await service.findTaskById('1');
    expect(result).toEqual(mockTasks[0]);
  });

  it('should update a task', async () => {
    const updates = { title: 'Updated' };
    const result = await service.updateTask('3', updates);
    expect(result).toEqual({ ...singleTask, title: 'Updated' });
  });

  it('should delete a task', async () => {
    const result = await service.deleteTask('1');
    expect(result).toEqual(mockTasks[0]);
  });
});
