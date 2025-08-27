import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { requestProperties } from '../utils/models';

export function validateRequest(
  schema: ObjectSchema,
  property: requestProperties = 'body'
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
}
