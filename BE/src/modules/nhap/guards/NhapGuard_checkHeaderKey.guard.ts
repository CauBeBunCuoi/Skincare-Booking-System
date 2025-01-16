import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class NhapGuard_checkHeaderKey implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(`Guard NHAP CheckHeaderKey [${new Date().toISOString()}]`);
    const request = context.switchToHttp().getRequest<Request>();
    const headerKey = request.header('key');
    if (headerKey === '123456') {
      return true;
    } else {
      return false;
    }
  }
}
