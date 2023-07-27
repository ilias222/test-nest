import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ImageDTO } from './image-dto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity/comments.entity';
import { Repository } from 'typeorm';
import { NewsService } from '../news.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
    private readonly newsService: NewsService,
    private readonly userService: UsersService,
    private readonly eventEmitter: EventEmitter2,
    ) {}

    async create(idNews: number, message: string, userId: number, fileAvatar: string):
Promise<CommentsEntity|HttpException> {
const _news = await this.newsService.findItems(idNews);
const _user = await this.userService.findById(userId);
if (!_news || !_user) {
throw new HttpException(
'Не существует такой новости',
HttpStatus.BAD_REQUEST,
);
}

const _commentEntity = new CommentsEntity();

if(fileAvatar){
  _commentEntity.cover = '/comments/' + fileAvatar;
}

_commentEntity.message = message;
_commentEntity.nameuser = _user.firstName;
_commentEntity.email = _user.email;
_commentEntity.idnews = _news.id;

return await this.commentsRepository.save(_commentEntity);
}

async findAll(idNews): Promise<CommentsEntity[]|undefined> {
return await this.commentsRepository.find({
where: {
  idnews: idNews,
}
});

}
async findById(id):Promise<CommentsEntity|undefined> {
return await this.commentsRepository.findOne({relations: ['news'] });
}
async remove(id: number) {
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
}
