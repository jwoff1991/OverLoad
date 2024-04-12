import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postArticle } from "../../../store/articles";
import { useDispatch, useSelector } from "react-redux";
import { StateType, AppDispatch } from "../../../typeDeclerations";
import "./createArticle.css";

const CreateNewArticle = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const nav = useNavigate();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const sessionUser = useSelector((state: StateType) => state.session.user);

  const validateField = (name: string, value: string) => {
    if (name === 'title' && value.length < 4) {
      return "Title must be at least 4 characters";
    } else if (name === 'body' && value.length < 10) {
      return "Body must be at least 10 characters";
    }
    return "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as 'title' | 'body'; // Type assertion

    if (fieldName === 'title') setTitle(value);
    if (fieldName === 'body') setBody(value);

    if (errors[fieldName]) {
      setErrors({ ...errors, [fieldName]: validateField(fieldName, value) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = {
      title: validateField('title', title),
      body: validateField('body', body),
    };

    setErrors(newErrors);
    if (!newErrors.title && !newErrors.body) {
      try {
        const newArticle = { user_id: sessionUser.id, title, body };
        const data = await dispatch(postArticle(newArticle));
        nav(`/articles/${data.id}`);
      } catch (error) {
        console.error('Failed to post the article:', error);
      }
    }
  };

  const titleClass = errors.title ? "article-title-errors" : "article-title-input";
  const bodyClass = errors.body ? "article-body-errors" : "article-body-input";

  return (
    <div className="create-new-article-form-container">
      <form className="create-article-form" onSubmit={handleSubmit}>
        <div className="article-form-submit-container">
          <button type="submit" className="submit-new-article-button">
            Publish
          </button>
        </div>
        <div className="article-title-input-container">
          <input
            name="title"
            value={title}
            maxLength={100}
            onChange={handleInputChange}
            placeholder="Title (min 4 characters)"
            className={titleClass}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="article-body-input-container">
          <textarea
            name="body"
            value={body}
            maxLength={5000}
            onChange={handleInputChange}
            placeholder="Tell your story...(min 10 characters)"
            className={bodyClass}
          />
          {errors.body && <div className="error">{errors.body}</div>}
        </div>
      </form>
    </div>
  );
};

export default CreateNewArticle;
