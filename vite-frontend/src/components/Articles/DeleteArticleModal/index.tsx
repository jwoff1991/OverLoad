import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { deleteArticle } from '../../../store/articles'
import "./DeleteArticleModal.css";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import store from "../../../store";
import { FormEvent } from "react";
import { useModal } from "../../../../context/Modal";

type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>

function DeleteArticleModal(props: {props: number}) {
  const id = props.props;
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
