import { useDispatch, useSelector } from "react-redux";
import { editArticle } from "../../../store/articles";
import React, { useState, useEffect } from "react";
import "./UpdateArticle.css";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { getOneArticle } from "../../../store/articles";

const EditArticle = () => {
  const articleId = useParams().id;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
//   const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const article = useSelector((state) => state.articles.singleArticle);

  useEffect(() => {
    dispatch(getOneArticle(articleId))
        .then((article) => {
            setTitle(article.title)
            setBody(article.body)
        })
  }, [dispatch, articleId]);

//   const reset = () => {
//     setTitle("");
//     setBody("");
//   };

  let isDisabled = true;
  if (title.length > 4 && body.length > 10) {
    isDisabled = false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const new_article = {
      id: article.id,
      user_id: sessionUser.id,
      title: title,
      body: body,
    };

    dispatch(editArticle(new_article)).then((data) => {
      history.push(`/articles/${articleId}`);
      return;
    });
  };
  return (
    <>
      <div className="create-new-article-form-container">
        <form className="create-article-form" onSubmit={handleSubmit}>
          <div className="article-title-input-container">
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="article-title-input"
            />
          </div>
          <div className="article-body-input-container">
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell your story..."
              className="article-body-input"
            />
          </div>
          <div className="article-form-submit-container">
            <button
              type="submit"
              className="submit-new-article-button"
              disabled={isDisabled}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditArticle;
