import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postArticle } from "../../../store/articles";
import "./createArticle.css";

const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  // const reset = () => {
  //   setTitle("");
  //   setBody("");
  // };

  let isDisabled = true;
  if (title.length > 4 && body.length > 10) {
    isDisabled = false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let articleId;
    const new_article = {
      user_id: sessionUser.id,
      title: title,
      body: body,
    };

    dispatch(postArticle(new_article))
        .then((data) => {
            articleId = data.id;
            history.push(`/articles/${articleId}`);
            return
        })
  };
  return (
    <>
      <div className="create-new-article-form-container">
        <form className="create-article-form" onSubmit={handleSubmit}>
          <div className="article-form-submit-container">
            <button
              type="submit"
              className="submit-new-article-button"
              disabled={isDisabled}
            >
              Publish
            </button>
          </div>
          <div className="article-title-input-container">
            <input
              name="title"
              value={title}
              maxLength='100'
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="article-title-input"
            />
          </div>
          <div className="article-body-input-container">
            <textarea
              name="body"
              value={body}
              maxLength='2500'
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell your story..."
              className="article-body-input"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNewArticle;
