import OpenModal from "../../OpenModalButton";
import ArticleLikes from "../ArticleLikes";
import CommentsModal from "../../Comments/ArticleCommentsModal";
import DeleteArticleModal from "../DeleteArticleModal";
import SpinnerLoadingScreen from "../../LoadingScreen";
import ReadingListAddButtonComponent from "../../ReadingList/addToReadingListButton";
import ReadingListRemoveButtonComponent from "../../ReadingList/removeFromReadingListButton";
import { getOneArticle } from "../../../store/articles";
import { Link, useParams } from "react-router-dom";
import { getUserReadingList } from "../../../store/readingList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType, AppDispatch, SingleArticleType } from "../../../typeDeclerations";
import "./singleArticle.css";



const SingleArticle = () => {
  const articleId = useParams().id;
  const article = useSelector((state: StateType) => state.articles.singleArticle);
  const sessionUser = useSelector((state: StateType) => state.session.user);
  const readingList = useSelector((state: StateType) => state.readingList);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const comments = useSelector(
    (state: StateType) => state.articles.singleArticle.comments
  );
  const likes = useSelector((state: StateType) => state.articles.singleArticle.likes);

  let commentsLength;
  if (comments && comments.length) {
    commentsLength = comments.length;
  }

  //creates a loading screen
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  //gets article and user reading list
  useEffect(() => {
    dispatch(getOneArticle(Number(articleId!)));
    if (sessionUser && sessionUser.id) {
      dispatch(getUserReadingList());
    }
  }, [dispatch, articleId, commentsLength, sessionUser]);

  //if no article is found, renders this
  if (!article.id) {
    return (
      <div className="article-id-not-found">
        The article you are looking for is not here
      </div>
    );
  }

  //converts date from database format to usable format
  const articleDateConverter = (article: SingleArticleType) => {
    let createdAtSplit = article.date_created.split("").slice(5, 11).join("");
    return createdAtSplit;
  };

//READING LIST
// Extract article IDs from user reading list
const userReadingListArticleIds = Object.values(readingList).map(item => item.article_id);

// Determine which button to render based on article ID presence in the reading list
const readingListButton = () => {
  const isArticleInReadingList = userReadingListArticleIds.includes(article.id);
  if (isArticleInReadingList) {
    return (
      <ReadingListRemoveButtonComponent
        articleId={article.id}
        userId={sessionUser.id.toString()}
      />
    );
  } else {
    return (
      <ReadingListAddButtonComponent
        articleId={article.id}
        userId={sessionUser.id}
      />
    );
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
      {loading ? (
        <SpinnerLoadingScreen />
      ) : (
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
                    {ArticleLikes(sessionUser, likes, articleId!)}
                    <OpenModal
                      buttonText={commentButton}
                      modalComponent={<CommentsModal articleId={Number(articleId!)} />}
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
                            <DeleteArticleModal props={articleId!} />
                          }
                          className="article-delete-button"
                        />
                        <Link
                          key={article.id}
                          to={`/article/${article.id}/edit`}
                        >
                          <button className="article-edit-button">
                            Edit Article
                          </button>
                        </Link>
                      </div>
                    </>
                  )}
              </div>
              <div className="article-body">{article.body}</div>
              <div></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleArticle;
