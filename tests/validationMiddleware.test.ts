import { validateRequest } from '../src/middlewares/validationMiddleware';
import { taskUpdateSchema } from '../src/validators/taskValidator';

describe('validateRequest', () => {
  it('should validate a mock task', () => {
    const req = { body: { title: '1' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    validateRequest(taskUpdateSchema)(req as any, res as any, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 for invalid data', () => {
    const req = { body: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    validateRequest(taskUpdateSchema)(req as any, res as any, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });
});
