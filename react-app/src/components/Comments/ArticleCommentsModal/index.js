import { useDispatch, useSelector } from "react-redux";
import "./CommentsModal.css";
import { useEffect, useState } from "react";
import { postComment } from "../../../store/comments";
import { getOneArticle } from "../../../store/articles";
import OpenModal from "../../OpenModalButton";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from "../UpdateComment";


function CommentsModal(props) {
  const [comment, setComment] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector(
    (state) => state.articles.singleArticle.comments
  );

  const [reload, setReload] = useState(0);
  const dispatch = useDispatch();
  const articleId = props.props;

  const isDisabled = comment.length === 0;

  useEffect(() => {
    dispatch(getOneArticle(articleId));
  }, [dispatch, articleId, reload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      article_id: articleId,
      user_id: sessionUser.id,
      body: comment,
    };
    // Await the dispatch call itself
    const data = await dispatch(postComment(newComment));
    if (data) {
      setComment("");
      setReload(reload + 1);
    }
  };

  const resetComment = () => {
    setComment('');
  };

  // Simplified dateChanger function
  const dateChanger = (date) => date.slice(5, 11);

  return (
    <div className="comments-create-read-div">
      <div className="comments-responses-div">
        <h3>Responses ({comments.length ? (comments.length) : (0)})</h3>
      </div>
      {sessionUser && sessionUser.id && (
        <div className="comments-create-div-with-buttons">
          <div className="comments-create">
            <textarea
              className="post-comment-form"
              placeholder="What are your thoughts?"
              maxLength='255'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <div className="comment-create-buttons">
              <div className="comment-form-buttons">
                <button className="cancle-button-comment-form"
                  onClick={resetComment}
                >Cancel</button>
              </div>
              <div className="comment-form-buttons">
                <button
                  className="submit-new-comment-button"
                  onClick={handleSubmit}
                  disabled={isDisabled}
                >
                  Respond
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="comments-display">
        {comments &&
          !comments.message &&
          comments.map(({ commenter, body, id, date_created }) => (
            <div key={id} className="comments-container">
              <div className="commentoer-name-date-edit-delete">
                <div className="commentor-name-post-date">
                  <div className="commentor-name">
                    {commenter.firstname}
                    <span>&#183;</span>
                    <div className="comment-post-date">{dateChanger(date_created)}</div>
                  </div>
                </div>
                <div className="edit-delete-buttons-comments">
                  {sessionUser &&
                    sessionUser.id &&
                    sessionUser.id === commenter.id && (
                      <>
                        <OpenModal
                          buttonText="Edit"
                          modalComponent={
                            <EditCommentModal props={[id, body, sessionUser]} />
                          }
                          className="comment-edit-button"
                        />
                        <OpenModal
                          buttonText="Delete"
                          modalComponent={
                            <DeleteCommentModal props={[id, articleId]} />
                          }
                          className="comment-delete-button"
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
