import React, { FormEvent, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModal from "../../OpenModalButton";
import EditCommentModal from "../UpdateComment";
import DeleteCommentModal from "../DeleteCommentModal";
import { postComment } from "../../../store/comments";
import { StateType, NewComment, AppDispatch } from "../../../typeDeclerations";
import { articleDateConverter } from "../../../helperFunctions";
import "./CommentsModal.css";
import { getOneArticle } from "../../../store/articles";

interface CommentsModalProps {
  articleId: number;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ articleId }) => {
  const [comment, setComment] = useState("");
  const sessionUser = useSelector((state: StateType) => state.session.user);
  const comments = useSelector(
    (state: StateType) => state.articles.singleArticle.comments
  );
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getOneArticle(Number(articleId!)));
  }, [dispatch, articleId]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (sessionUser) {
        const newComment: NewComment = {
          article_id: articleId,
          user_id: sessionUser.id,
          body: comment,
        };
        const data = await dispatch(postComment(newComment));
        if (data) {
          setComment("");
        }
      }
    },
    [dispatch, sessionUser, comment, articleId]
  );

  const resetComment = useCallback((e: FormEvent) => {
    e.preventDefault();
    setComment("");
  }, []);

  return (
    <div className="comments-create-read-div">
      <div className="comments-responses-div">
        <h3>Responses ({comments.length})</h3>
      </div>
      {!comments.length && (
        <div className="no-comments-yet">This article has no comments</div>
      )}
      {sessionUser && (
        <div className="comments-create-div-with-buttons">
          <div className="comments-create">
            <textarea
              className="post-comment-form"
              placeholder="What are your thoughts?"
              maxLength={255}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="comment-create-buttons">
              <button
                className="cancle-button-comment-form"
                onClick={resetComment}
              >
                Cancel
              </button>
              <button
                className="submit-new-comment-button"
                onClick={handleSubmit}
                disabled={!comment.length}
              >
                Respond
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="comments-display">
        {comments.map(({ commenter, body, id, date_created }) => (
          <div key={id} className="comments-container">
            <div className="commentoer-name-date-edit-delete">
              <div className="commentor-name-post-date">
                <div className="commentor-name">
                  {commenter.firstname} &#183;{" "}
                  <span className="comment-post-date">
                    {articleDateConverter(date_created)}
                  </span>
                </div>
              </div>
              {sessionUser?.id === commenter.id && (
                <div className="edit-delete-buttons-comments">
                  <OpenModal
                    buttonText="Edit"
                    modalComponent={
                      <EditCommentModal
                        props={[id, body, sessionUser, articleId]}
                      />
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
                </div>
              )}
            </div>
            <div className="comment-body">{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CommentsModal);
