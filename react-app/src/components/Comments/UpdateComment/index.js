import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editComment } from "../../../store/comments";
import "./EditCommentModal.css";
import { useEffect, useState } from "react";
import { getOneArticle } from "../../../store/articles";

function EditCommentModal(props) {
  const [id, body, sessionUser] = props.props;
  const { closeModal } = useModal();
  const [comment, setComment] = useState(body);
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getOneArticle(id));
  }, [reload]);

  let isDisabled = true;
  if (comment.length > 0) {
    isDisabled = false;
  }
  const handleSubmit = async (e) => {
    const editedComment = {
      id: id,
      article_id: id,
    //   user_id: sessionUser.id,
      body: comment,
    };
    const data = await dispatch(editComment(editedComment));
    closeModal()
  };

  return (
    <>
      {/*sessionUser && sessionUser.id &&*/  (
        <div className="comments-create-div-with-buttons">
          <div className="comments-create">
            <textarea
              className="post-comment-form"
              placeholder={comment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="comment-create-buttons">
            <button>Cancel</button>
            <button onClick={handleSubmit} disabled={isDisabled}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default EditCommentModal;
