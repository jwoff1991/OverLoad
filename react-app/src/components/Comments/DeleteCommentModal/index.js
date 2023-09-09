import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteComment } from "../../../store/comments";
import "./DeleteCommentModal.css";
import { getOneArticle } from "../../../store/articles";

function DeleteCommentModal(props) {
  const commentId = props.props[0];
  const articleId = props.props[1]
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    const data = await dispatch(deleteComment(commentId));
    if(data) {
      dispatch(getOneArticle(articleId))
      closeModal()
    }
  };

  return (
    <div className="delete-comment-confirm-delete-modal">
      <h1 className="confirm-delete-modal-heading">Delete Comment?</h1>
      <h2 className="confirm-delete-modal-text">
        Deletion is not reversible, and the story will be completely deleted. If
        you do not want to delete, you can cancel.
      </h2>
      <div>
        <button className="delete-modal-delete-Comment" onClick={handleDelete}>
          Delete
        </button>
        <button className="delete-modal-keep-Comment" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
