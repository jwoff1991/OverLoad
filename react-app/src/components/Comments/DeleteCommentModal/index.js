import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteComment } from "../../../store/comments";
import OpenModal from "../../OpenModalButton";
import CommentsModal from "../ArticleCommentsModal";
import "./DeleteCommentModal.css";

function DeleteCommentModal(props) {
  const id = props.props;
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    const data = await dispatch(deleteComment(id));

    closeModal()

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
