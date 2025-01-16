import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/modules/nhap/decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('getHandler', context.getHandler());
    console.log('getClass', context.getClass());
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Nếu không yêu cầu vai trò nào, cho phép truy cập.
    }

    const { user } = context.switchToHttp().getRequest();
    // console.log('user', user);
    return requiredRoles.some((role) => user.role.name == role);
  }
}

