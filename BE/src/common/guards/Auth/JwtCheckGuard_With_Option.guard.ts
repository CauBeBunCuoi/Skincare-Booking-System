
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Type, mixin } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { join } from 'path';
import { JwtConfig } from 'src/config/jwt.config';
import { Reflector } from '@nestjs/core';

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

