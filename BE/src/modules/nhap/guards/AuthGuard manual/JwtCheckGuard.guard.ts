
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { join } from 'path';
import { JwtConfig } from 'src/config/jwt.config';
import { Reflector } from '@nestjs/core';
import { JwtOption_KEY } from '../../decorators/jwtOption.decorator';

@Injectable()
export class JwtCheckGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const { jwt_token } = context.switchToHttp().getRequest();
    const request = context.switchToHttp().getRequest();

    const option = this.reflector.get<string>(JwtOption_KEY, context.getHandler());

    console.log('option', option);

    try {
      var user = null;
      if (option === 'secret') {
        user = this.decodeToken_OneSecretKey(jwt_token);
      }
      if (option === 'public_private') {
        user = this.decodeToken_TwoPublicPrivateKey(jwt_token);
      }

      request.user = user; // Gắn thông tin người dùng vào request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private decodeToken_OneSecretKey(token: string): any {
    const decoded = jwt.verify(token, JwtConfig.SECRET);
    return decoded;
  }

  private decodeToken_TwoPublicPrivateKey(token: string): any {
    const publicKey = fs.readFileSync(join(process.cwd(), JwtConfig.PUBLIC_KEY_PATH)).toString();
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256'], // Đảm bảo thuật toán phù hợp
    });
    return decoded;

  }

}
