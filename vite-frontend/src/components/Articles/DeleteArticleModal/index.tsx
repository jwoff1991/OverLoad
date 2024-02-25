import { useModal } from "../../../../context/Modal";
import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from "../../../typeDeclerations";
import { deleteArticle } from '../../../store/articles'
import "./DeleteArticleModal.css";


function DeleteArticleModal(props: {props: string}) {
  const id = parseInt(props.props);
  const { closeModal } = useModal();
  const nav = useNavigate()
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    const data = await dispatch(deleteArticle(id));
    if(data) {
      closeModal();
      nav(`/`)
      return
    }
  };

  return (
    <div className="delete-story-confirm-delete-modal">
      <h1 className="confirm-delete-modal-heading">Delete article?</h1>
      <h2 className="confirm-delete-modal-text">
      Deletion is not reversible, and the story will be completely deleted. If you do not want to delete, you can cancel.
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

export default DeleteArticleModal;
