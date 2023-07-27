import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { NewsEntity } from './news.entity/news.entity';

export interface News {
  id: number;
  title: string;
  descript: string;
  author: string;
  dataMess: Date;
  imgTitle?: string | object;
  text?: string;
}

type Files = {
  filename: string
}

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}
  private news: News[] = [
    {
      id: 1,
      title: 'Новость 1',
      descript: 'Описание новости 1',
      text: '',
      author: 'Иван',
      dataMess: new Date(),
      imgTitle: '/news/Kartinka.jpg',
    },
    {
      id: 2,
      title: 'Кошка',
      descript: 'Кошка (лат. Felis catus) — домашнее животное, одно из наиболее популярных \
       (наряду с собакой) животных-компаньонов',
      text: 'С точки зрения научной систематики, домашняя кошка — млекопитающее семейства кошачьих\
      отряда хищных. Одни исследователи рассматривают домашнюю кошку как подвид дикой кошки, другие\
      — как отдельный биологический вид[6].\
      Являясь одиночным охотником на грызунов и других мелких животных, кошка — социальное животное,\
      использующее для общения широкий диапазон звуковых сигналов, а также феромоны и движения тела[8].\
      В настоящее время в мире насчитывается около 600 млн домашних кошек, выведено около 200 пород, от\
      длинношёрстных (персидская кошка) до лишённых шерсти (сфинксы), признанных и зарегистрированных\
      различными фелинологическими организациями.\
      На протяжении 10 000 лет кошки ценятся человеком, в том числе за способность охотиться на грызунов\
       и других домашних вредителей, а также за умение забавлять и утешать детей.',
      author: 'Василий',
      dataMess: new Date(),
      imgTitle: '/news/1041436899_0_206_2905_1840_1920x0_80_0_0_c7022893b761781d76fe592010d14bd2.jpg'
    }
  ];

  async readNews(body){
    return await this.newsRepository.find({
      where: {
        author: body
      }
    })
  }

  async fullList(): Promise<NewsEntity[]> {
    return await this.newsRepository.find({});
  }

  async createItemNews(News: News, file:Files): Promise<News>{
    return await this.newsRepository.save(News)

    // News.id = this.news.length + 1;
    // let coverPath;
    // if(file?.filename.length > 0) {
    //   coverPath = PATH_NEWS + file.filename;
    // }
    // News.imgTitle = coverPath;
    // this.news.push(News);
    // return 'Новость добавленна';
  }

  async findItems(id: number): Promise<NewsEntity | null> {
    return await this.newsRepository.findOneBy({ id });
    
    // const itemNews = this.news.find((item) => item.id == index);
    // if (itemNews) {
    //   return itemNews;
    // } else {
    //   throw new HttpException(
    //     'INTERNAL_SERVER_ERROR',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    }

  async findAllItems(id: number): Promise<NewsEntity | null>{
    return await this.newsRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
      order: {
        user:{
          createdAt:'DESC',
        },
        },
      })
  }

  async read(newsItem){
    console.log('КОЛБАС', newsItem)
    this.newsRepository.update({id: newsItem.id}, {title: newsItem.title, descript: newsItem.describ, cover: newsItem.cover});
    console.log("TTTTTT", await this.newsRepository.findOneBy({id: newsItem.id}));
  }

  async remove(idNews: number) {
    // console.log("USE DELETE", idNews);
    await this.newsRepository.delete(idNews);
    return true;
    // if (this.news.find((item) => item.id === idNews)) {
    //   return delete this.news?.[idNews];
    // } else {
    //   throw new HttpException(
    //     'INTERNAL_SERVER_ERROR',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }
}
