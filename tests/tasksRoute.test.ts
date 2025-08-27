import express from 'express';
import tasksRouter from '../src/routes/tasks';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use('/tasks', tasksRouter);

describe('tasksRouter', () => {
  it('GET /tasks should return 200', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    // Add more assertions as needed
  });

  it('POST /tasks should create a new task', async () => {
    const res = await request(app).post('/tasks').send({ title: 'New Task' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('New Task');
    expect(res.body.completed).toBe(false);
  });

  it('PUT /tasks/:id should update an existing task', async () => {
    // create a task
    const createRes = await request(app).post('/tasks').send({ title: 'abc' });
    const taskId = createRes.body.id;

    // Update the task
    const updatedTask = { title: 'Updated Task', completed: true };
    const res = await request(app).put(`/tasks/${taskId}`).send(updatedTask);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(updatedTask.title);
    expect(res.body.completed).toBe(updatedTask.completed);
  });

  it('DELETE /tasks/:id should delete a task', async () => {
    // create a task
    const createRes = await request(app).post('/tasks').send({ title: 'abc' });
    const taskId = createRes.body.id;

    // Delete the task
    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.status).toBe(204);

    // Verify deletion
    const getRes = await request(app).get(`/tasks/${taskId}`);
    expect(getRes.status).toBe(404);
  });
});
