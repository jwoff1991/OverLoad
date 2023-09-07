import "./singleArticle.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getOneArticle } from "../../../store/articles";
import DeleteArticleModal from "../DeleteArticleModal";
import OpenModal from "../../OpenModalButton";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import CommentsModal from "../../Comments/ArticleCommentsModal";

const SingleArticle = () => {
  const articleId = useParams().id;
  const article = useSelector((state) => state.articles.singleArticle);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneArticle(articleId));
  }, [dispatch, articleId]);

  if (!article.id) {
    return (
      <div className="article-id-not-found">
        The article you are looking for is not here
      </div>
    );
  }


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
            <div className="date-created">{article.date_created}</div>
          </div>
          <div className="likes-comments-edit-delete-container">
            <div className="comments-modal-button-container">
                  <OpenModal
                    buttonText="Comments"
                    modalComponent={<CommentsModal props={articleId} />}
                    className="article-comments-modal-button"
                  />
            </div>
            {article.author &&
              article.author.id && sessionUser &&
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
