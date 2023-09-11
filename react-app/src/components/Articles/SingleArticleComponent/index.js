import "./singleArticle.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getOneArticle } from "../../../store/articles";
import DeleteArticleModal from "../DeleteArticleModal";
import OpenModal from "../../OpenModalButton";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import CommentsModal from "../../Comments/ArticleCommentsModal";
import { getUserReadingList } from "../../../store/readingList";


const SingleArticle = () => {
  const articleId = useParams().id;
  const article = useSelector((state) => state.articles.singleArticle);
  const sessionUser = useSelector((state) => state.session.user);
  const readingList = useSelector((state) => state.readingList)
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) => state.articles.singleArticle.comments
  );

    let commentsLength;
    if(comments && comments.length) {
      commentsLength = comments.length
    }

  useEffect(() => {
    dispatch(getOneArticle(articleId));
    if(sessionUser && sessionUser.id) {
      dispatch(getUserReadingList(sessionUser.id))
  }
  }, [dispatch, articleId, commentsLength]);

  if (!article.id) {
    return (
      <div className="article-id-not-found">
        The article you are looking for is not here
      </div>
    );
  }

  const articleDateConverter =(article) => {
    let createdAtSplit = article.date_created.split('').slice(5, 11).join('')
    return createdAtSplit
  }


  let userReadingListArticleId = []
  const userReadingList = Object.values(readingList)
  const articleInReadingList = (userReadingList) => {
      userReadingList.map(({article_id}) => {
          userReadingListArticleId.push(article_id)
      })
  }
  articleInReadingList(userReadingList, sessionUser)
  const readingListButton = () => {
     if (userReadingListArticleId.includes(article.id)) {
      return <button className="reading-list-button" ><img className='bookmark-icon' src='/icons/bookmark-black-shape_25353.png' alt='black bookmark'/></button>
    } else {
      return <button className="reading-list-button" ><img className='bookmark-icon' src='/icons/bookmark_10330015.png' alt='bookmark'/></button>
    }
  }

  const commentButton = (
  <div className="comments-icon-and-number-container">
    <div className="comments-icon-container">
      <img className='comments-icon' src='/icons/chat_589670.png' alt='chat icon'/>
    </div>
    <div className="comments-number-container">
      {comments.length}
    </div>
  </div>
  )
  return (
    <>
      <div className="article-container">
        <div className="single-article-div">
          <div className="article-title">{article.title}</div>
          <div className="article-author-and-date">
            <div className="author">
              {article.author && article.author.firstname}{" "}
              {article.author && article.author.lastname}
            </div>
            <span>&#183;</span>
            <div className="date-created">{articleDateConverter(article)}</div>
          </div>
          <div className="likes-comments-edit-delete-container">
            <div className="comment-and-reading-list-buttons">
              <div className="comments-modal-button-container">
                <OpenModal
                      buttonText={commentButton}
                      modalComponent={<CommentsModal props={articleId} />}
                      className="article-comments-modal-button"
                    />
              </div>
              { sessionUser ? (
              <>
              {readingListButton()}
              </>
              ) : (
              <></>
              )}
            </div>
            {article.author &&
              article.author.id &&
              sessionUser &&
              sessionUser.id === article.author.id && (
                <>
                  <OpenModal
                    buttonText="Delete"
                    modalComponent={<DeleteArticleModal props={articleId} />}
                    className="article-delete-button"
                  />
                  <NavLink key={article.id} to={`/article/${article.id}/edit`}>
                    <button>Edit Article</button>
                  </NavLink>
                </>
              )}
          </div>
          <div className="article-body">{article.body}</div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SingleArticle;
