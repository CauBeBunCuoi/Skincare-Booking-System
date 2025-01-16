
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { join } from 'path';
import { JwtConfig } from 'src/config/jwt.config';

@Injectable()
export class AuthGuard_Manual implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const jwt_token = this.extractToken(authorizationHeader);

    request.jwt_token = jwt_token;
    return true;

    // try {
    //   // Giải mã token (sử dụng secret phù hợp với ứng dụng của bạn)
    //   // const user = this.decodeToken_OneSecretKey(token); // Thay thế 'your_secret_key' bằng giá trị bí mật của bạn
    //   const user = this.decodeToken_TwoPublicPrivateKey(token);
    //   request.user = user; // Gắn thông tin người dùng vào request
    //   return true;
    // } catch (err) {
    //   throw new UnauthorizedException('Invalid token');
    // }
  }
  
  private extractToken(authorizationHeader: string): string {
    // Header có định dạng: "Bearer <token>"
    if (!authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header format');
    }
    return authorizationHeader.replace('Bearer ', '');
  }
}
