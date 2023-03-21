import { ValidationError as Err } from 'class-validator';

export class ValidationError extends Error {
  constructor(public errors: Err[]) {
    super('Validation Error');
  }
}
