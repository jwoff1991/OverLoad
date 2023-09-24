import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { deleteComment } from "../../../store/comments";
import "./DeleteCommentModal.css";
import { getOneArticle } from "../../../store/articles";
import React from "react";

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
      <h2 className="confirm-delete-modal-heading">Delete Comment?</h2>
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
