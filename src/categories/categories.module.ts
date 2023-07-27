import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './categories.entity/categories.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { NewsModule } from 'src/news/news.module';
import { NewsService } from 'src/news/news.service';
import { NewsController } from 'src/news/news.controller';

@Module({
  imports: [
    forwardRef(() => NewsModule), 
    TypeOrmModule.forFeature([CategoriesEntity])
  ],
  exports: [TypeOrmModule, CategoriesService],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})

export class CategoriesModule {}
