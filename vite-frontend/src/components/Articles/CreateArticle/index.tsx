import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postArticle } from "../../../store/articles";
import "./createArticle.css";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import store from "../../../store";


type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio: string;
}
type ArticleType = {
  id: number;
  title: string;
  body: string;
  author: UserType;
  comments: string;
  likes: string;
  date_created: string;
}
type StateType = {
  articles: {
    allArticles: ArticleType[];
    singleArticle: ArticleType;
  };
  session: {
    user: UserType; // Replace UserType with the actual type of user
  };
  readingList: {
    [key: string]: any;
  };
}


type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>

const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ title?: string, body?: string }>({});
    const nav = useNavigate();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const sessionUser = useSelector((state: StateType) => state.session.user);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let articleId;
    const new_article = {
      user_id: sessionUser.id,
      title: title,
      body: body,
    };
    if (title.length > 4 && body.length > 10) {
      dispatch(postArticle(new_article)).then((data) => {
        articleId = data.id;
        nav(`/articles/${articleId}`);
        return;
      });
    }

    if (title.length < 4) {
      setErrors({ title: "Title must be at least 4 characters" });
    }
    if (body.length < 10) {
      setErrors({ body: "Body must be at least 10 characters" });
    }
    if (title.length < 4 && body.length < 10) {
      setErrors({
        title: "Title must be at least 4 characters",
        body: "Body must be at least 10 characters",
      });
    }
  };

    const titleClass = errors.title
      ? "article-title-errors"
      : "article-title-input";
    const bodyClass = errors.body ? "article-body-errors" : "article-body-input";
  return (
    <>
      <div className="create-new-article-form-container">
        <form className="create-article-form" onSubmit={handleSubmit}>
          <div className="article-form-submit-container">
            <button
              type="submit"
              className="submit-new-article-button"
              // disabled={isDisabled}
            >
              Publish
            </button>
          </div>
          <div className="article-title-input-container">
            <input
              name="title"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (min 4 characters)"
              className={titleClass}
            />
          </div>
          <div className="article-body-input-container">
            <textarea
              name="body"
              value={body}
              maxLength={5000}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell your story...(min 10 characters)"
              className={bodyClass}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNewArticle;
