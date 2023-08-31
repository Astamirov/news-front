import style from './Articles.module.css'
import styleIndex from '../Css/index.module.css'
import { useState, useEffect } from 'react';

// import art1 from '../images/article_1.jpg'
// import art2 from '../images/article_2.jpg'
// import art3 from '../images/article_3.jpg'

export const Articles = () => {
    const [articles, setArticles] = useState([
        {
            imageUrl: '',
            category: '',
            date: '',
            title: '',
            text: '',
          },
    ]);

    useEffect(() => {
      // Отправляем запрос к серверу для получения списка новостей
      fetch('http://localhost:4000/articles')
        .then(res => res.json())
        .then(data => {
            console.log(data)
          setArticles(data)
          console.log(data)
          ; // Устанавливаем полученные данные в состояние
        })
        .catch(error => {
          console.error('Error fetching articles:', error);
        });
    }, []);

    if (articles === null) {
        return <div>Loading...</div>;
      }

    return (
        <div className={style.articles} id='articles'>
          <div className={styleIndex.container}>
            <div className={style.articles__inner}>
              {articles.map((article, index) => (
                <div className={style.article} key={index}>
                  <div className={style.article__image}>
                    <img src={article.imageUrl} alt="" className={style.articleImg} />
                    <div className={style.article__name}>{article.category}</div>
                  </div>
                  <div className={style.article__content}>
                    <span className={style.article__date}>{article.date}</span>
                    <h3 className={style.article__title}>{article.title}</h3>
                    <p className={style.article__text}>{article.text}</p>
                    <button className={style.articleBtn}>читать продолжение</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
