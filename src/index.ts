import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/todos', async (req: Request, res: Response) => {
  const todos = await prisma.task.findMany();
  res.json(todos);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title } = req.body;
  const todo = await prisma.task.create({ data: { title } });
  res.json(todo);
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});