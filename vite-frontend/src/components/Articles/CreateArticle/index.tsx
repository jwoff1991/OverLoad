import { useNavigate } from "react-router-dom";
import { postArticle } from "../../../store/articles";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType, AppDispatch } from "../../../typeDeclerations";
import "./createArticle.css";


const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ title?: string, body?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const nav = useNavigate();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const sessionUser = useSelector((state: StateType) => state.session.user);


  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (submitted) {
      updateErrors({ ...errors, title: e.target.value.length < 4 ? "Title must be at least 4 characters" : "" });
    }
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    if (submitted) {
      updateErrors({ ...errors, body: e.target.value.length < 10 ? "Body must be at least 10 characters" : "" });
    }
  };

  const updateErrors = (newErrors: { title?: string, body?: string }) => {
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string, body?: string } = {};
    if (title.length < 4) {
      newErrors.title = "Title must be at least 4 characters";
    }
    if (body.length < 10) {
      newErrors.body = "Body must be at least 10 characters";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const new_article = {
        user_id: sessionUser.id,
        title: title,
        body: body,
      };
      dispatch(postArticle(new_article)).then((data) => {
        const articleId = data.id;
        nav(`/articles/${articleId}`);
      });
    } else {
      setSubmitted(true);
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
            >
              Publish
            </button>
          </div>
          <div className="article-title-input-container">
            <input
              name="title"
              value={title}
              maxLength={100}
              onChange={handleTitleChange}
              placeholder="Title (min 4 characters)"
              className={titleClass}
            />
          </div>
          <div className="article-body-input-container">
            <textarea
              name="body"
              value={body}
              maxLength={5000}
              onChange={handleBodyChange}
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
