import { useModal } from "../../../context/Modal";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../typeDeclerations";
import { deleteComment } from "../../../store/comments";
import "./DeleteCommentModal.css";
import { getOneArticle } from "../../../store/articles";

function DeleteCommentModal(props: { props: [commentId: number, articleId: number] }) {
  const [commentId, articleId] = props.props;
  const { closeModal } = useModal();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await dispatch(deleteComment(commentId));
      if (data) {
        closeModal();
        dispatch(getOneArticle(articleId));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const returnToComments = (e: FormEvent) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-comment-confirm-delete-modal">
      <h2 className="confirm-delete-modal-heading">Delete Comment?</h2>
      <div>
        <button className="delete-modal-delete-Comment" onClick={handleDelete}>
          Delete
        </button>
        <button
          className="delete-modal-keep-Comment"
          onClick={returnToComments}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
