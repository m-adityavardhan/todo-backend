import { Request, Response } from 'express';

import { mockTasks, singleTask } from './mocks/mockTasks';
import { TaskController } from '../src/controllers/taskController';
import { TaskService } from '../src/services/taskService';
jest.mock('../src/services/taskService');

describe('TaskController', () => {
    let controller: TaskController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockTaskService: jest.Mocked<TaskService>;

    beforeEach(() => {
        mockTaskService = new TaskService() as jest.Mocked<TaskService>;
        controller = new TaskController();
        controller['taskService'] = mockTaskService;

        mockReq = {};
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    describe('getTasks', () => {
        it('should return tasks', async () => {
            mockTaskService.getTasks.mockResolvedValue(mockTasks);
            await controller.getTasks(mockReq as Request, mockRes as Response);
            expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
        });

        it('should handle errors', async () => {
            mockTaskService.getTasks.mockRejectedValue(new Error());
            await controller.getTasks(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Failed to fetch tasks' });
        });
    });

    describe('createTask', () => {
        it('should create a task', async () => {
            mockReq = { body: { title: singleTask.title, color: singleTask.color } };
            mockTaskService.createTask.mockResolvedValue(singleTask);
            await controller.createTask(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(singleTask);
        });

        it('should handle errors', async () => {
            mockReq = { body: { title: 'New', color: 'red' } };
            mockTaskService.createTask.mockRejectedValue(new Error());
            await controller.createTask(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Failed to create task' });
        });
    });

    describe('updateTask', () => {
        it('should update a task', async () => {
            mockReq = {
                params: { id: '1' },
                body: { title: 'Updated', color: 'blue', completed: true },
            };
            mockTaskService.findTaskById.mockResolvedValue(singleTask);
            mockTaskService.updateTask.mockResolvedValue({ ...singleTask, title: 'Updated', color: 'blue', completed: true });
            await controller.updateTask(mockReq as Request, mockRes as Response);
            expect(mockRes.json).toHaveBeenCalledWith({
                id: '3',
                title: 'Updated',
                color: 'blue',
                completed: true,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            });
        });

        it('should return 404 if task not found', async () => {
            mockReq = { params: { id: '1' }, body: {} };
            mockTaskService.findTaskById.mockResolvedValue(null);
            await controller.updateTask(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Task not found' });
        });

        it('should handle errors', async () => {
            mockReq = { params: { id: '1' }, body: {} };
            mockTaskService.findTaskById.mockRejectedValue(new Error());
            await controller.updateTask(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Failed to update task' });
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            mockReq = { params: { id: '1' } };
            mockTaskService.findTaskById.mockResolvedValue(singleTask);
            mockTaskService.deleteTask.mockResolvedValue(singleTask);
            await controller.deleteTask(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(204);
            expect(mockRes.send).toHaveBeenCalled();
        });

        it('should return 404 if task not found', async () => {
            mockReq = { params: { id: '1' } };
            mockTaskService.findTaskById.mockResolvedValue(null);
            await controller.deleteTask(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Task not found' });
        });

        it('should handle errors', async () => {
            mockReq = { params: { id: '1' } };
            mockTaskService.findTaskById.mockRejectedValue(new Error());
            await controller.deleteTask(mockReq as Request, mockRes as Response);
            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Failed to delete task' });
        });
    });
});
