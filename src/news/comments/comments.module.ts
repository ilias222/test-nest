import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './comments.entity/comments.entity'; 
import { NewsModule } from '../news.module';
import { UsersModule } from '../../users/users.module';
import { NewsService } from '../news.service';
import { NewsEntity } from '../news.entity/news.entity';
import { AuthService } from 'src/auth/auth.service';
import { SocketCommentsGateway } from './socket-comments.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
controllers: [CommentsController],
providers: [CommentsService, SocketCommentsGateway, NewsService, AuthService, JwtService],
exports: [CommentsService],
imports: [
forwardRef(() => NewsModule),
UsersModule,
TypeOrmModule.forFeature([CommentsEntity]),
TypeOrmModule.forFeature([NewsEntity]),
],
})
export class CommentsModule {}