import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/modules/nhap/decorators/role.decorator';

@Injectable()
export class CheckMetaData implements CanActivate {
    constructor(private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log(`Guard CheckMetaData (Toan Cuc NhapModule) [${new Date().toISOString()}]`);
        console.log('\n=====[Start Check MetaData]=====');
        console.log('-getHandler', await context.getHandler());
        console.log('-getClass', await context.getClass());
        
        const requiredRoles_BOTH = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const requiredRoles_CLASS = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getClass(),
        ]);

        const requiredRoles_HANDLER = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
        ]);

        
        console.log('-requiredRoles', requiredRoles_BOTH);
        console.log('-requiredRoles_HANDLER', requiredRoles_HANDLER);
        console.log('-requiredRoles_CLASS', requiredRoles_CLASS);
        console.log('=====[End Check MetaData]=====\n');
        return true
    }
}

