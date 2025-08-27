import { PrismaClient, Task } from '@prisma/client';
import { TaskColor, UpdateTaskRequest } from '../utils/models';

export class TaskService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createTask(title: string, color?: string) {
    return this.prisma.task.create({
      data: {
        title: title.trim(),
        color: color || TaskColor.BLUE,
      },
    });
  }

  async findTaskById(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
    });
  }

  async updateTask(id: string, updates: UpdateTaskRequest) {
    const data: UpdateTaskRequest = {
      ...(updates.title != undefined && { title: updates.title.trim() }),
      ...(updates.color != undefined && { color: updates.color }),
      ...(updates.completed != undefined && { completed: updates.completed }),
    };
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
