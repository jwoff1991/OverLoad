import OpenModal from "../../OpenModalButton";
import EditCommentModal from "../UpdateComment";
import DeleteCommentModal from "../DeleteCommentModal";
import { postComment } from "../../../store/comments";
import { getOneArticle } from "../../../store/articles";
import { useDispatch, useSelector } from "react-redux";
import { FormEvent, useEffect, useState } from "react";
import { AppDispatch, StateType, NewComment } from "../../../typeDeclerations";
import "./CommentsModal.css";


function CommentsModal(props: { articleId: number }) {
  const [comment, setComment] = useState("");
  const sessionUser = useSelector((state: StateType) => state.session.user);
  const comments = useSelector(
    (state: StateType) => state.articles.singleArticle.comments
  );

  const [reload, setReload] = useState(0);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const articleId = props.articleId;

  let isDisabled = true;
  if (comment.length > 0) {
    isDisabled = false;
  }

  useEffect(() => {
    dispatch(getOneArticle(articleId));
  }, [dispatch, articleId, reload]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newComment: NewComment = {
      article_id: articleId,
      user_id: sessionUser.id,
      body: comment,
    };
    const data = await dispatch(postComment(newComment));
    if (data) {
      setComment("");
      setReload(reload + 1);
    }
  };

  const resetComment = (e: FormEvent) => {
    e.preventDefault();
    setComment("");
  };

  const dateChanger = (date: String) => {
    const newDate = date.split("").slice(5, 11).join("");
    return newDate;
  };

  return (
    <div className="comments-create-read-div">
      <div className="comments-responses-div">
        <h3>Responses ({comments.length ? comments.length : 0})</h3>
      </div>
      {comments.length == 0 ?
      <div className="no-comments-yet">This article has no comments</div>
      : null}
      {sessionUser && sessionUser.id && (
          <div className="comments-create-div-with-buttons">
            <div className="comments-create">
              <textarea
                className="post-comment-form"
                placeholder="What are your thoughts?"
                maxLength={255}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <div className="comment-create-buttons">
                <div className="comment-form-buttons">
                  <button
                    className="cancle-button-comment-form"
                    onClick={resetComment}
                  >
                    Cancel
                  </button>
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
            comments.map(({ commenter, body, id, date_created }) => (
              <div key={id} className="comments-container">
                <div className="commentoer-name-date-edit-delete">
                  <div className="commentor-name-post-date">
                    <div className="commentor-name">
                      {commenter.firstname}
                      <span>&#183;</span>
                      <div className="comment-post-date">
                        {dateChanger(date_created)}
                      </div>
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
