import { useModal } from "../../../context/Modal";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../typeDeclerations";
import { deleteComment } from "../../../store/comments";
import "./DeleteCommentModal.css";


function DeleteCommentModal(props: { props: [commentId: number]  }) {
  const [ commentId ]  = props.props;
  const { closeModal } = useModal();
  const dispatch: AppDispatch = useDispatch<AppDispatch>();


  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    const data = await dispatch(deleteComment(commentId))
    if(data) {
      console.log("No error deleting comment")
    }
    closeModal();
    window.location.reload();
  };

  const returnToComments = (e: FormEvent) => {
    e.preventDefault();
    closeModal();
    window.location.reload();
  }

  return (
    <div className="delete-comment-confirm-delete-modal">
      <h2 className="confirm-delete-modal-heading">Delete Comment?</h2>
      <div>
        <button className="delete-modal-delete-Comment" onClick={handleDelete}>
          Delete
        </button>
        <button className="delete-modal-keep-Comment" onClick={returnToComments}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCommentModal;
