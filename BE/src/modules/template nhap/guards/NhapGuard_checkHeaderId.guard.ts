import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class NhapGuard_checkHeaderId implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(`Guard NHAP CheckHeaderId [${new Date().toISOString()}]`);
    const request = context.switchToHttp().getRequest<Request>();
    const headerId = request.header('id');
    if (headerId === '888') {
      return true;
    } else {
      return false;
    }
  }
}
