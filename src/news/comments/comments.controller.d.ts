/// <reference types="multer" />
import { CommentsService } from './comments.service';
import { CommentCreadeDTO } from './create-Comment.dto';
import { CommentsEntity } from './comments.entity/comments.entity';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    getAll(idNews: any): Promise<CommentsEntity[]>;
    create(comment: CommentCreadeDTO, comments: Express.Multer.File): Promise<CommentsEntity | import("@nestjs/common").HttpException>;
    remove(idNews: any, idComment: any): Promise<CommentsEntity>;
    removeAll(idNews: any): Promise<CommentsEntity[]>;
}
