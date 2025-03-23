import { Request, Response, NextFunction } from 'express';

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  // TODO: add self error instance

  console.error('🔥 Error:', err);

  res.status(500).json({
    status: 'error',
    message: 'unhandled exception',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}
