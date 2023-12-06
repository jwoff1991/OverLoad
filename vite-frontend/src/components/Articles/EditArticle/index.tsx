import { useDispatch, useSelector } from "react-redux";
import { editArticle } from "../../../store/articles";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { getOneArticle } from "../../../store/articles";
import "./UpdateArticle.css";

type ErrorsType = {
  title: string,
  body: string
}

type ArticleType = {
  id: number,
  user_id: number,
  title: string,
  body: string,
};

type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio: string;
}

type StateType = {
  session: {
    user: UserType; // Replace UserType with the actual type of user
  };
  articles: {
    singleArticle: ArticleType; // Replace ArticleType with the actual type of singleArticle
  };
}

const EditArticle = () => {
  const articleId = useParams().id;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<ErrorsType | undefined>();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state: StateType) => state.session.user);
  const article = useSelector((state: StateType) => state.articles.singleArticle);

  useEffect(() => {
    dispatch(getOneArticle(articleId?)).then((article: ArticleType) => {
      setTitle(article.title);
      setBody(article.body);
    });
  }, [dispatch, articleId]);

  const titleClass = errors?.title
    ? "article-title-errors"
    : "article-title-input";
  const bodyClass = errors?.body ? "article-body-errors" : "article-body-input";

  // let isDisabled = true;
  // if (title.length > 4 && body.length > 10) {
  //   isDisabled = false;
  // }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const new_article = {
      id: article.id,
      user_id: sessionUser.id,
      title: title,
      body: body,
    };

    if (title.length > 4 && body.length > 10) {
      dispatch(editArticle(new_article)).then(() => {
        nav(`/articles/${articleId}`);
        return;
      });
    }
    if (title.length < 4) {
      setErrors({ title: "Title must be at least 4 characters", body: '' });
    }
    if (body.length < 10) {
      setErrors({ title: '', body: "Body must be at least 10 characters" });
    }
    if (title.length < 4 && body.length < 10) {
      setErrors({
        title: "Title must be at least 4 characters",
        body: "Body must be at least 10 characters",
      });
    }
  };
  return (
    <>
      <div className="create-new-article-form-container">
        <form className="create-article-form" onSubmit={handleSubmit}>
          <div className="article-title-input-container">
            <input
              name="title"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (min 4 chars)"
              className={titleClass}
            />
          </div>
          <div className="article-body-input-container">
            <textarea
              name="body"
              value={body}
              maxLength={5000}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell your story...(min 10 chars)"
              className={bodyClass}
            />
          </div>
          <div className="article-form-submit-container">
            <button
              type="submit"
              className="submit-new-article-button"
              // disabled={isDisabled}
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
