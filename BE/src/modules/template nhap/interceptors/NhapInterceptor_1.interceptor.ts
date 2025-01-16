import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NhapInterceptor_1 implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    // Log thông tin request
    console.log(`Interceptor NHAP 1 (Toan Cuc NhapModule) PreHandle, Request info: ${request.method} ${request.url}`);
    return next.handle().pipe(
      tap(() =>
        console.log(
          `Interceptor NHAP 1 (Toan Cuc NhapModule) PostHandle, Request took ${Date.now() - now}ms`,
        ),
      ),
    );
  }
}




