"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketCommentsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const ws_jwt_guard_1 = require("../../auth/ws-jwt.guard");
const comments_service_1 = require("./comments.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let SocketCommentsGateway = class SocketCommentsGateway {
    constructor(commentsService) {
        this.commentsService = commentsService;
        this.logger = new common_1.Logger('AppGateway');
    }
    async handleMessage(client, comment) {
        const { idNews, message } = comment;
        const userId = client.data.user.id;
        const _comment = await this.commentsService.create(idNews, message, userId);
        this.server.to(idNews.toString()).emit('newComment', _comment);
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    async handleConnection(client, ...args) {
        const { newsId } = client.handshake.query;
        client.join(newsId);
        this.logger.log(`Client connected: ${client.id}`);
    }
    handleReadCommentEvent(payload) {
        const { commentId, newsId } = payload;
        this.server.to(newsId.toString()).emit('readComment', { id: commentId });
    }
    handleRemoveCommentEvent(payload) {
        const { commentId, newsId } = payload;
        this.server.to(newsId.toString()).emit('removeComment', { id: commentId });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketCommentsGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_guard_1.WsJwtGuard),
    (0, websockets_1.SubscribeMessage)('addComment'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], SocketCommentsGateway.prototype, "handleMessage", null);
__decorate([
    (0, event_emitter_1.OnEvent)('comment.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SocketCommentsGateway.prototype, "handleReadCommentEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)('comment.remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SocketCommentsGateway.prototype, "handleRemoveCommentEvent", null);
SocketCommentsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], SocketCommentsGateway);
exports.SocketCommentsGateway = SocketCommentsGateway;
//# sourceMappingURL=socket-comments.gateway.js.map