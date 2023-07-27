import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { CommentsService } from './comments.service';
import { CommentCreadeDTO } from './create-Comment.dto';
import { CommentsEntity } from './comments.entity/comments.entity';

const PATH_COMMENTS = '/comments/';
const commentsFileLoader = new HelperFileLoader();
commentsFileLoader.path = PATH_COMMENTS;

@Controller('news-comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('/all')
  getAll(@Query('idNews') idNews){
    return this.commentsService.findAll(idNews);
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('comments', { 
    storage: diskStorage({
      destination: 'public/comments',
      filename: commentsFileLoader.customFileName,
    })}))
  create(@Body() comment: CommentCreadeDTO,  @UploadedFile() comments: Express.Multer.File) {
    console.log(comments)
    return this.commentsService.create(parseInt(comment.idNews), comment.message, comment.idUser, comments.filename);
  }

  // @Post('/redact')
  // redactor(@Body() textComment){
  //   console.log("Body controler", textComment)
  //   this.commentsService.redaction(textComment);
  // }

  @Delete(':id')
  remove(@Query('idNews') idNews, @Param('id') idComment): Promise<CommentsEntity> {
    return this.commentsService.remove(idComment);
  }

  @Delete('all')
  removeAll(@Query('idNews') idNews): Promise<CommentsEntity[]> {
    return this.commentsService.removeAll(idNews);
  }
}
