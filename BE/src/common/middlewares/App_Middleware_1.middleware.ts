import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class App_Middleware_1 implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
