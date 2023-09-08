import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./CommentsModal.css";
import { useEffect, useState } from "react";
import { postComment } from "../../../store/comments";
import { getOneArticle } from "../../../store/articles";
import OpenModal from "../../OpenModalButton";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../UpdateComment";
import EditDeleteButton from "../EditDeleteButton/editDeleteButton";


function CommentsModal(props) {
  const { closeModal } = useModal();
  const [comment, setComment] = useState("");
  //   const [popupDelete, setpopupDelete] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector(
    (state) => state.articles.singleArticle.comments
  );
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch();
  const id = props.props;

  let isDisabled = true;
  if (comment.length > 0) {
    isDisabled = false;
  }

  useEffect(() => {
    dispatch(getOneArticle(id));
  }, [reload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      article_id: id,
      user_id: sessionUser.id,
      body: comment,
    };
    const data = await dispatch(postComment(newComment));
    setComment("");
    setReload(reload + 1);
  };

  return (
    <div className="comments-create-read-div">
      <div className="comments-responses-div">
        <h1>Responses ({comments.length})</h1>
      </div>
      {sessionUser && sessionUser.id && (
      <div className="comments-create-div-with-buttons">
        <div className="comments-create">
          <textarea
            className="post-comment-form"
            placeholder="What are your thoughts?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="comment-create-buttons">
          <button>Cancel</button>
          <button onClick={handleSubmit} disabled={isDisabled}>
            Respond
          </button>
        </div>
      </div>)}
      <div className="comments-display">
        {comments &&
          !comments.message &&
          comments.map(({ commenter, body, id, date_created }) => (
            <div key={id} className="comments-container">
              <div className="commentoer-name-date-edit-delete">
                <div className="commentor-name-post-date">
                  <div className="commentor-name">
                    {commenter.firstname}
                    {commenter.lastname}
                  </div>
                  <div className="comment-post-date">{date_created}</div>
                </div>
                <div className="edit-delete-buttons">
                  {sessionUser &&
                    sessionUser.id &&
                    sessionUser.id === commenter.id && (
                      <>
                        {/* <EditDeleteButton props={[id, body, sessionUser]} /> */}
                        <OpenModal
                        buttonText="Edit"
                        modalComponent={<EditCommentModal props={[id, body, sessionUser]} />}
                        className="article-delete-button"
                      />
                        <OpenModal
                          buttonText="Delete"
                          modalComponent={<DeleteCommentModal props={id} />}
                          className="article-delete-button"
                        />
                      </>
                    )}
                </div>
              </div>
              <div className="comment-body">{body}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentsModal;