import { Module, forwardRef } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CommentsModule } from './comments/comments.module';
import { MailModule } from 'src/mail/mail.module';
import { CommentsService } from './comments/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './news.entity/news.entity';
import { UsersModule } from 'src/users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    CommentsModule,
    MailModule,
    UsersModule,
    forwardRef(() => CategoriesModule),
    TypeOrmModule.forFeature([NewsEntity]),
  ],
  controllers: [NewsController],
  providers: [NewsService, AuthService, JwtService],
})
export class NewsModule {}
