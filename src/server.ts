import express from 'express';
import TaskRouter from './routes/tasks';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/tasks', TaskRouter);

app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
