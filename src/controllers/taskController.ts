import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { TaskService } from "../services/taskService";

const prisma = new PrismaClient();

export class TaskController {
    private taskService: TaskService
    constructor() {
        this.taskService = new TaskService();
    }

    async getTasks(req: Request, res: Response) {
        try {
            const tasks = await this.taskService.getTasks();
            res.json(tasks)
        } catch (error) {
            console.error('Error fetching tasks:', error)
            res.status(500).json({ error: 'Failed to fetch tasks' })
        }
    }

    async createTask(req: Request, res: Response) {
        try {
            const { title, color } = req.body;
            const task = await this.taskService.createTask(title, color); 
            res.status(201).json(task)
        } catch (error) {
            console.error('Error creating task:', error)
            res.status(500).json({ error: 'Failed to create task' })
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { title, color, completed } = req.body

            const existingTask = await this.taskService.findTaskById(id);

            if (!existingTask) {
                return res.status(404).json({ error: 'Task not found' })
            }

            const task = await this.taskService.updateTask(id, { title, color, completed });

            res.json(task)
        } catch (error) {
            console.error('Error updating task:', error)
            res.status(500).json({ error: 'Failed to update task' })
        }
    }

    async deleteTask(req: Request, res: Response) {
        try {
            const { id } = req.params

            const existingTask = await this.taskService.findTaskById(id);


            if (!existingTask) {
                return res.status(404).json({ error: 'Task not found' })
            }

            await this.taskService.deleteTask(id);

            res.status(204).send()
        } catch (error) {
            console.error('Error deleting task:', error)
            res.status(500).json({ error: 'Failed to delete task' })
        }
    }
}