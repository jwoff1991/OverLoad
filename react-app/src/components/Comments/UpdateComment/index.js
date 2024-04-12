import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editComment } from "../../../store/comments";
import "./EditCommentModal.css";
import { useState } from "react";


function EditCommentModal(props) {
  const [id, body, sessionUser] = props.props;
  const { closeModal } = useModal();
  const [comment, setComment] = useState(body);
  const dispatch = useDispatch();


  // Simplified isDisabled assignment
  const isDisabled = comment.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const editedComment = {
      id: id,
      article_id: id,
      user_id: sessionUser.id,
      body: comment,
    };

    try {
      const data = await dispatch(editComment(editedComment));
      if (data) {
        closeModal(); // Close the modal only if the dispatch was successful
      }
    } catch (error) {
      console.error("Failed to edit the comment:", error);
      // Optionally, handle the error (e.g., display an error message to the user)
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
