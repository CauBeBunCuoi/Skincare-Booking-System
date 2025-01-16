
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Type, mixin } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { join } from 'path';
import { JwtConfig } from 'src/config/jwt.config';
import { Reflector } from '@nestjs/core';
import { JwtOption_KEY } from '../../decorators/jwtOption.decorator';

//*** Tóm tắt quy trình xử lí theo cơ chế của NestJS:
//  1. JwtCheckGuard_With_Option (Function Guard):
//            + Nó đóng vai trò là một factory, tạo ra một class mới mỗi lần gọi với tham số truyền vào (ở đây là option: string).
//            + Class được tạo ra là một Guard với @Injectable() như thông thường trong NestJS, nó sẽ được quản lý trong DI Container.
//  2. Mixin ( return mixin(Guard) ):
//            + Đảm bảo rằng class mới được tạo ra vẫn có thể được NestJS quản lý đúng cách, như các Guard hoặc Provider khác.

// [ĐẠI KHÁI]: thay vì tạo 1 class Guard như truyền thống (không thể truyền tham số), 
//             ta tạo 1 function Guard cho nhận vào tham số và trả về 1 class Guard có thể sử dụng tham số đó thông quan mixin(Guard)
//             ** mixin(Guard) sẽ đảm bảo class Guard trả về giống như 1 class Guard thông thường có thể sử dụng trong module

export function JwtCheckGuard_With_Option(option: string): Type<CanActivate> {
  @Injectable()
  class Guard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      var token = null;
      try {
        token = this.extractAuthorizationHeaderToken(request);
      } catch (err) {
        return false;
      }

      if (option === 'secret') {
        request.user= this.decodeToken_OneSecretKey(token);
      } else if (option === 'public_private') {
        request.user= this.decodeToken_TwoPublicPrivateKey(token);
      } else {
        return false;
      }
      return true;

    }

    private extractAuthorizationHeaderToken(request: any): string {
      const authorizationHeader = request.headers['authorization'];
      if (!authorizationHeader) {
        throw new UnauthorizedException('Authorization header is missing');
      }
      if (!authorizationHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid authorization header format');
      }
      return authorizationHeader.replace('Bearer ', '');
    }

    private decodeToken_OneSecretKey(token: string): any {
      try {
        const decoded = jwt.verify(token, JwtConfig.SECRET);
        return decoded;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }

    private decodeToken_TwoPublicPrivateKey(token: string): any {
      try {
        const publicKey = fs.readFileSync(join(process.cwd(), JwtConfig.PUBLIC_KEY_PATH)).toString();
        const decoded = jwt.verify(token, publicKey, {
          algorithms: ['RS256'],
        });
        return decoded;
      } catch (err) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
  return mixin(Guard);

}

