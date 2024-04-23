import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOneArticle } from "../../../store/articles";
import { getUserReadingList } from "../../../store/readingList";
import { StateType, AppDispatch } from "../../../typeDeclerations";
import { articleDateConverter } from "../../../helperFunctions";

import OpenModal from "../../OpenModalButton";
import ArticleLikes from "../ArticleLikes";
import CommentsModal from "../../Comments/ArticleCommentsModal";
import DeleteArticleModal from "../DeleteArticleModal";
import SpinnerLoadingScreen from "../../LoadingScreen";
import ReadingListButton from "../../readingListButton";

import "./singleArticle.css";


const SingleArticle = () => {
  const articleId = useParams().id;
  const article = useSelector(
    (state: StateType) => state.articles.singleArticle
  );
  const sessionUser = useSelector((state: StateType) => state.session.user);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const comments = useSelector(
    (state: StateType) => state.articles.singleArticle.comments
  );
  const likes = useSelector(
    (state: StateType) => state.articles.singleArticle.likes
  );

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      await dispatch(getOneArticle(Number(articleId!)));
      if (sessionUser && sessionUser.id) {
        await dispatch(getUserReadingList());
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, articleId, sessionUser]);

  //COMMENT BUTTON
  const commentButton = (
    <div className="comments-icon-and-number-container">
      <div className="comments-icon-container">
        <img
          className="comments-icon"
          src="/icons/chat_589670.png"
          alt="chat icon"
        />
      </div>
      <div className="comments-number-container">
        {comments && comments.length ? comments.length : 0}
      </div>
    </div>
  );

  //LOADING SCREEN
  if (loading) {
    return <SpinnerLoadingScreen />;
  } else if (!article.id) {
    return (
      <div className="article-id-not-found">
        The article you are looking for is not here
      </div>
    );
  }

  return (
    <div
      className={
        sessionUser ? "article-container" : "article-container-logged-out"
      }
    >
      <div className="single-article-div">
        <div className="article-title">{article.title}</div>
        <div className="article-author-and-date">
          <div className="author">
            {article.author?.firstname} {article.author?.lastname}
          </div>
          <span>&#183;</span>
          <div className="date-created">
            {articleDateConverter(article.date_created)}
          </div>
        </div>
        <div className="likes-comments-edit-delete-container">
          <div className="comment-and-reading-list-buttons">
            <div className="comments-modal-button-container">
              {ArticleLikes(sessionUser, likes, articleId!)}
              <OpenModal
                buttonText={commentButton}
                modalComponent={
                  <CommentsModal articleId={Number(articleId!)} />
                }
                className="article-comments-modal-button"
              />
            </div>
            {sessionUser && <ReadingListButton articleId={article.id} />}
          </div>
          {sessionUser?.id === article.author?.id && (
            <div className="edit-delete-buttons">
              <OpenModal
                buttonText="Delete"
                modalComponent={<DeleteArticleModal props={articleId!} />}
                className="article-delete-button"
              />
              <Link key={article.id} to={`/article/${article.id}/edit`}>
                <button className="article-edit-button">Edit Article</button>
              </Link>
            </div>
          )}
        </div>
        <div className="article-body">{article.body}</div>
      </div>
    </div>
  );
};

export default SingleArticle;
