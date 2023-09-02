import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './ArticleDetail.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import { fetchArticleById } from '../../features/applicationSlice'
import { postComment } from '../../features/applicationSlice';

const ArticleDetail = () => {
  const { articleId } = useParams() as { articleId: string };
  const [commentText, setCommentText] = useState('');
  const token = useSelector((state: RootState) => state.application.token);
  const article = useSelector((state: RootState) => state.application.articles.find(a => a._id === articleId))
  const dispatch = useDispatch<AppDispatch>(); 



  const handleCommentSubmit = async () => {
    try {
      const resultAction = await dispatch(postComment({ articleId, commentText }));
      if (postComment.fulfilled.match(resultAction)) {
        setCommentText('');
        // После успешного добавления комментария, обновите статью, чтобы получить новую версию с комментарием
        dispatch(fetchArticleById(articleId));
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    console.log('articleId:', articleId);
    console.log('ArticleDetail рендерится снова');
    dispatch(fetchArticleById(articleId));
  }, [articleId, dispatch]);


  
if (!article) {
  return <div>Loading...</div>;
}
  
 console.log('first')
  return (
    <div className={style.articleDetail}>
        <div className={style.article__image}>
            <img src={article.imageUrl} alt="" className={style.articleImg} />
            <div className={style.article__name}>{article.category}</div>
        </div>
        <div className={style.article__content}>
            <span className={style.article__date}>{article.date}</span>
            <h3 className={style.article__title}>{article.title}</h3>
            <p className={style.article__text}>{article.text}</p>
        </div>
        <div className={style.commentSection}>
            
            <h3 className={style.com__title}>Комментарии</h3>
            {!token ? (
                <p>Оставлять комментарии могут только авторизованные пользователи, <Link to='/login'>aвторизоваться?</Link></p>
            ) : (
                <>
                    <input 
                        className={style.inputCom}
                        type="text" 
                        placeholder="Введите комментарий" 
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}
                    />
                    <button className={style.addComBtn} onClick={handleCommentSubmit}>Добавить комментарий</button>
                </>
            )}
            
            {article.comments.map((comment, index) => (
                 
                <div key={index} className={style.comment}>
                    <div className={style.comment__user}>
                    
                        <h4 className={style.user__name}>{comment.author ? comment.author.login : null}</h4>
                    </div>
                    <p>{comment.text}</p>
                </div>
            ))}
        </div>
    </div>
    );
};

export default ArticleDetail;
