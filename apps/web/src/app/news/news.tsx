import './news.module.scss';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface NewsProps {}
export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}

export function News(props: NewsProps) {
  const [news, setNews] = useState([] as PeaceOfNews[]);
  const sortNews = (news: PeaceOfNews[]) => {
    return news.sort((a, b) => a.createdAt - b.createdAt)
  }

useEffect(() => {
    caches.open('fetch-news').then((cache) => {
      cache.match("http://localhost:3333/api/news").then(async function (response) {
        if (response) {
        setNews(await response.json());
          console.log('Вывод из кеша');
        } else {
          fetch('http://localhost:3333/api/news')
      .then(response => response.json())
      .then(news => {
        const sortedNews = sortNews(news);
        setNews(sortedNews);
        caches.open('fetch-news').then((cache) => {
          cache.add('http://localhost:3333/api/news')
          console.log('Список новостей в кеше');
        })
        .catch((err) => err.message);
      })
  }
        })
      });
    }, [])

  return (
    <div>
      <h1>Последние новости</h1>
      <ul>
      {news.map(peaceOfNews => {
        return <li key={peaceOfNews.id}>
          <h2>{peaceOfNews.title}</h2>
          <p>{peaceOfNews.description}</p>
          <hr/>
        </li>
      })}
      </ul>
    </div>
  );
}

export default News;
