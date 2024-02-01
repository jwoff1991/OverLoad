import { useDispatch } from "react-redux";
import { useModal } from "../../../../context/Modal";
import { editComment } from "../../../store/comments";
import "./EditCommentModal.css";
import { FormEvent, useState } from "react";

import { AppDispatch, UserType } from "../../../typeDeclerations";

type EditCommentModalProps = {
  props: [id: number, body: string, sessionUser: UserType];
};

type EditedComment = {
  id: number;
  user_id: number;
  body: string;
}

function EditCommentModal(props: EditCommentModalProps) {
  const [id, body, sessionUser] = props.props;
  const { closeModal } = useModal();
  const [comment, setComment] = useState(body);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();


  let isDisabled = true;
  if (comment.length > 0) {
    isDisabled = false;
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const editedComment: EditedComment = {
      id: id,
      user_id: sessionUser.id,
      body: comment,
    };
    const data = await dispatch(editComment(editedComment));
    if(data) {
      closeModal()
    }
  };

  return (
    <>

        <div className="comments-edit-div-with-buttons">
          <h4>Edit your comment</h4>
          <div className="comments-create">
            <textarea
              className="edit-comment-form"
              placeholder={comment}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="comment-edit-buttons">
            <button className='cancle-edit-button' onClick={closeModal}>Cancel</button>
            <button className='submit-edited-comment'onClick={handleSubmit} disabled={isDisabled}>
              Confirm
            </button>
          </div>
        </div>

    </>
  );
}

export default EditCommentModal;
