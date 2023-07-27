import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
export declare class RolesGuard implements CanActivate {
    private readonly reflector;
    private readonly usersService;
    private readonly authService;
    constructor(reflector: Reflector, usersService: UsersService, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
