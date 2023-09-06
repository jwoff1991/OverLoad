import "./singleArticle.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getOneArticle } from "../../store/articles";
import DeleteArticleModal from "../DeleteArticleModal";
import OpenModal from "../OpenModalButton";

const SingleArticle = () => {
  const articleId = useParams().id;
  const article = useSelector((state) => state.articles.singleArticle);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneArticle(articleId));
  }, [dispatch, articleId, article]);

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
          <div>
            {article.author &&
              article.author.id &&
              sessionUser.id === article.author.id && (
                <OpenModal
                  buttonText="Delete"
                  modalComponent={<DeleteArticleModal props={articleId} />}
                  className="article-comments-delete-button"
                />
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
