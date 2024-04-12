import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postArticle } from "../../../store/articles";
import "./createArticle.css";

const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const new_article = {
      user_id: sessionUser.id,
      title: title,
      body: body,
    };

    if (title.length < 4) {
      errors.title = "Title must be at least 4 characters";
    }

    if (body.length < 10) {
      errors.body = "Body must be at least 10 characters";
    }

    if (Object.keys(errors).length === 0) {
      dispatch(postArticle(new_article)).then((data) => {
        const articleId = data.id;
        history.push(`/articles/${articleId}`);
      });
    } else {
      setErrors(errors);
    }
  };

  const titleClass = errors.title ? "article-title-errors" : "article-title-input";
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
