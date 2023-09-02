import style from './Articles.module.css'
import styleIndex from '../Css/index.module.css'
import { useEffect } from 'react';
// import { Article } from '../../features/types';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../../features/applicationSlice';
import { useSelector, useDispatch } from 'react-redux';
import {  AppDispatch, RootState } from '../../app/store';

export const Articles = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector((state: RootState) => state.application.articles);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

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
                    <Link to={`/article/${article._id}`} className={style.articleBtn}>
                  Читать продолжение
                </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };
