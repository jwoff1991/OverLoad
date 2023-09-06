import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postArticle } from "../../store/articles";
import "./createArticle.css";

const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const reset = () => {
    setTitle("");
    setBody("");
  };

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
      <div id="create-new-article-form-container">
        <form id="create-article-form" onSubmit={handleSubmit}>
          <div id="article-title-input-container">
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              id="article-title-input"
            />
          </div>
          <div id="article-body-input-container">
            <textarea
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell your story..."
              id="article-body-input"
            />
          </div>
          <div id="article-form-submit-container">
            <button
              type="submit"
              id="submit-new-article-button"
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

export default CreateNewArticle;
