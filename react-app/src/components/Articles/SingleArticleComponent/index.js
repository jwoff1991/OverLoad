import "./singleArticle.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getOneArticle } from "../../../store/articles";
import DeleteArticleModal from "../DeleteArticleModal";
import OpenModal from "../../OpenModalButton";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import CommentsModal from "../../Comments/ArticleCommentsModal";
import ArticleLikes from "../ArticleLikes";
import { getUserReadingList } from "../../../store/readingList";
import ReadingListAddButtonComponent from "../../ReadingList/addToReadingListButton";
import ReadingListRemoveButtonComponent from "../../ReadingList/removeFromReadingListButton";
import SpinnerLoadingScreen from "../../LoadingScreen";

const SingleArticle = () => {
  const articleId = useParams().id;
  const article = useSelector((state) => state.articles.singleArticle);
  const sessionUser = useSelector((state) => state.session.user);
  const readingList = useSelector((state) => state.readingList);
  const dispatch = useDispatch();

  const comments = useSelector(
    (state) => state.articles.singleArticle.comments
  );
  const likes = useSelector((state) => state.articles.singleArticle.likes);


  const commentsLength = comments ? comments.length : 0;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    dispatch(getOneArticle(articleId));
    if (sessionUser?.id) {
      dispatch(getUserReadingList(sessionUser.id));
    }
  }, [dispatch, articleId, commentsLength, sessionUser]);

  if (loading) {
    return <SpinnerLoadingScreen />;
  }

  if (!article.id) {
    return (
      <div className="article-id-not-found">
        The article you are looking for is not here
      </div>
    );
  }

  const articleDateConverter = (article) =>
    article.date_created.slice(5, 11);

  const userReadingListArticleId = Object.values(readingList).map(({ article_id }) => article_id);

  const readingListButton = () => {
    if (userReadingListArticleId.includes(article.id)) {
      return <ReadingListRemoveButtonComponent props={[article.id, sessionUser.id]} />;
    } else {
      return <ReadingListAddButtonComponent props={[article.id, sessionUser.id]} />;
    }
  };


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

  const loggedIn = sessionUser
    ? "article-container"
    : "article-container-logged-out";
  return (
    <>
        <>
          <div className={loggedIn}>
            <div className="single-article-div">
              <div className="article-title">{article.title}</div>
              <div className="article-author-and-date">
                <div className="author">
                  {article.author && article.author.firstname}{" "}
                  {article.author && article.author.lastname}
                </div>
                <span>&#183;</span>
                <div className="date-created">
                  {articleDateConverter(article)}
                </div>
              </div>
              <div className="likes-comments-edit-delete-container">
                <div className="comment-and-reading-list-buttons">
                  <div className="comments-modal-button-container">
                    {ArticleLikes(sessionUser, likes, articleId)}
                    <OpenModal
                      buttonText={commentButton}
                      modalComponent={<CommentsModal props={articleId} />}
                      className="article-comments-modal-button"
                    />
                  </div>
                  {sessionUser ? <>{readingListButton()}</> : <></>}
                </div>
                {article.author &&
                  article.author.id &&
                  sessionUser &&
                  sessionUser.id === article.author.id && (
                    <>
                      <div className="edit-delete-buttons">
                        <OpenModal
                          buttonText="Delete"
                          modalComponent={
                            <DeleteArticleModal props={articleId} />
                          }
                          className="article-delete-button"
                        />
                        <NavLink
                          key={article.id}
                          to={`/article/${article.id}/edit`}
                        >
                          <button className="article-edit-button">
                            Edit Article
                          </button>
                        </NavLink>
                      </div>
                    </>
                  )}
              </div>
              <div className="article-body">{article.body}</div>
              <div></div>
            </div>
          </div>
        </>
    </>
  );
};

export default SingleArticle;
