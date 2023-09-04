import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import style from './ArticleDetail.module.css';
import stringHash from "string-hash";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import { fetchArticleById } from '../../features/applicationSlice'
import { postComment, removeComment } from '../../features/applicationSlice';

const ArticleDetail = () => {
  const { articleId } = useParams() as { articleId: string };
  const [commentText, setCommentText] = useState('');
  const token = useSelector((state: RootState) => state.application.token);
  const article = useSelector((state: RootState) => state.application.articles.find(a => a._id === articleId))
  const dispatch = useDispatch<AppDispatch>(); 
  const userLogin = useSelector((state: RootState) => state.auth.user.login);

  const handleRemove = (commentId: string) => {
      dispatch(removeComment({ articleId, commentId }));
    
  }

  console.log()


  const handleCommentSubmit = async () => {
    try {
      const resultAction = await dispatch(
        postComment({ articleId, commentText, author: { login: userLogin  } })
      );
      if (postComment.fulfilled.match(resultAction)) {
        setCommentText('');
        dispatch(fetchArticleById(articleId));
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  useEffect(() => {
    dispatch(fetchArticleById(articleId));
  }, [articleId, dispatch]);



  
if (!article) {
  return <div>Loading...</div>;
}
  
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
                    <div
                      className={style.user__avatar}
                      style={{ backgroundColor: `#${(stringHash(comment.username || '') % 0xfffffA).toString(15)}` }}>
                      {comment.username ? comment.username[0].toUpperCase() : "A"}
                    </div>
                        <h4 className={style.user__name}>{comment.username || 'Автор неизвестен'}</h4>
                    </div>
                    <div className={style.comment__inner}>
                      <p>{comment.text}</p>
                      <button className={style.removeBtnComment} onClick={() => handleRemove(comment._id)}>❌</button>
                    </div>
                    
                </div>
            ))}
        </div>
    </div>
    );
};

export default ArticleDetail;
