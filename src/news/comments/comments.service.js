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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const HelperFileLoader_1 = require("../../utils/HelperFileLoader");
const event_emitter_1 = require("@nestjs/event-emitter");
const typeorm_1 = require("@nestjs/typeorm");
const comments_entity_1 = require("./comments.entity/comments.entity");
const typeorm_2 = require("typeorm");
const news_service_1 = require("../news.service");
const users_service_1 = require("../../users/users.service");
const PATH_NEWS = '/comments/';
const helperFileLoader = new HelperFileLoader_1.HelperFileLoader();
helperFileLoader.path = PATH_NEWS;
let CommentsService = class CommentsService {
    constructor(commentsRepository, newsService, userService, eventEmitter) {
        this.commentsRepository = commentsRepository;
        this.newsService = newsService;
        this.userService = userService;
        this.eventEmitter = eventEmitter;
    }
    async create(idNews, message, userId) {
        const _news = await this.newsService.findItems(idNews);
        const _user = await this.userService.findById(userId);
        if (!_news || !_user) {
            throw new common_1.HttpException('Не существует такой новости', common_1.HttpStatus.BAD_REQUEST);
        }
        const _commentEntity = new comments_entity_1.CommentsEntity();
        _commentEntity.news = _news;
        _commentEntity.message = message;
        _commentEntity.user = _user;
        return await this.commentsRepository.save(_commentEntity);
    }
    async findAll(idNews) {
        return await this.commentsRepository.find({
            where: { news: idNews },
            relations: ['user'],
        });
    }
    async findById(id) {
        return await this.commentsRepository.findOne({ relations: ['news'] });
    }
    async remove(id) {
        const _comment = await this.findById(id);
        this.eventEmitter.emit('comment.remove', {
            commentId: _comment.id,
            newsId: _comment.news.id,
        });
        return await this.commentsRepository.remove(_comment);
    }
    async removeAll(idNews) {
        const _comments = await this.findAll(idNews);
        return await this.commentsRepository.remove(_comments);
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comments_entity_1.CommentsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        news_service_1.NewsService,
        users_service_1.UsersService,
        event_emitter_1.EventEmitter2])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map