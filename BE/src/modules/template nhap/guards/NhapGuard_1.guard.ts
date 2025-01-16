import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class NhapGuard_1 implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log(`Guard NHAP 1 (Toan Cuc NhapModule) [${new Date().toISOString()}]`);
    return true; // đang ví dụ nên để true
  }
}
