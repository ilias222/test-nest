import { UsersService } from './users.service';
import { UserCreateDto } from './user-create.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService);
    create(user: UserCreateDto, response: Response): Promise<void>;
}
