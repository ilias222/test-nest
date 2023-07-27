import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity/users.entity';
import { UserCreateDto } from './user-create.dto';
export type User = any;
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UsersEntity>);
    create(user: UserCreateDto): Promise<any>;
    findById(id: any): Promise<UsersEntity>;
    findByEmail(email: any): Promise<UsersEntity>;
    setModerator(idUser: any): Promise<UsersEntity>;
}
