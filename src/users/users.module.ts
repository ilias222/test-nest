import { forwardRef, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity/users.entity';
import { RolesGuard } from '../auth/role/roles.guard';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
@Module({
providers: [
UsersService,
AuthService,
JwtService,
{
    provide: APP_GUARD,
    useClass: RolesGuard,
    },
],
controllers: [UsersController],
imports: [
TypeOrmModule.forFeature([UsersEntity]),
forwardRef(() => AuthModule),
],
exports: [UsersService],
})
export class UsersModule {}
