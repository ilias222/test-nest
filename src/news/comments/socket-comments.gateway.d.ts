import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CommentsService } from './comments.service';
export type Comment = {
    message: string;
    idNews: number;
};
export declare class SocketCommentsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    server: Server;
    private logger;
    handleMessage(client: Socket, comment: Comment): Promise<void>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleReadCommentEvent(payload: any): void;
    handleRemoveCommentEvent(payload: any): void;
}
