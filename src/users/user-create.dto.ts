import { IsNotEmpty, IsString, IsEmail, ValidateIf, IsObject } from "class-validator";
import { Role } from "src/auth/role/role.enum";

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    roles: Role;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsObject()
    files: object;
}