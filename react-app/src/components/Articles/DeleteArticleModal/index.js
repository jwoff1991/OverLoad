import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { useModal } from "../../../context/Modal";
import { deleteArticle } from '../../../store/articles'
import "./DeleteArticleModal.css";

function DeleteArticleModal(props) {
  const id = props.props;
  const { closeModal } = useModal();
  const history = useHistory()
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    const data = await dispatch(deleteArticle(id));
    if(data) {
      closeModal();
      history.push(`/`)
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
