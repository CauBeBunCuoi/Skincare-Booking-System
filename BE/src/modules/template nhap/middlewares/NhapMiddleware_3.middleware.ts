import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class NhapMiddleware_3 implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Middleware NHAP 3 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next(); // Tiếp tục đến middleware hoặc controller tiếp theo
  }
}
