import { HttpException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CommentsEntity } from './comments.entity/comments.entity';
import { Repository } from 'typeorm';
import { NewsService } from '../news.service';
import { UsersService } from 'src/users/users.service';
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly newsService;
    private readonly userService;
    private readonly eventEmitter;
    constructor(commentsRepository: Repository<CommentsEntity>, newsService: NewsService, userService: UsersService, eventEmitter: EventEmitter2);
    create(idNews: number, message: string, userId: number): Promise<CommentsEntity | HttpException>;
    findAll(idNews: any): Promise<CommentsEntity[] | undefined>;
    findById(id: any): Promise<CommentsEntity | undefined>;
    remove(id: number): Promise<CommentsEntity>;
    removeAll(idNews: any): Promise<CommentsEntity[]>;
}
