import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import store from '.';
import {getOneArticle} from './articles'


type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>
type Comment = {
  id: number,
  article_id: number,
  user_id: number,
  body: String,
}

export const postComment = (comment: Comment) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch("/api/comments/new-comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if(response.ok) {
      const data = await response.json();
      const newComment = data;
      dispatch(getOneArticle(newComment.article_id));
      return newComment;
      } else {
        const errors = await response.json();
        return errors;
      }
    } catch (error) {
      const errors =
      error instanceof Error
        ? { message: error.toString() }
        : { message: "An error occurred" };
      return errors;
    }
  };

  export const editComment = (comment: Comment) => async (dispatch: AppDispatch) => {
    const id = comment.id
    try {
      const request = await fetch(`/api/comments/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if(!request.ok) {
      const data = await request.json();
      const editedComment = data;
      dispatch(getOneArticle(editedComment.article_id));
      return editedComment;
      } else {
        const errors = await request.json();
        return errors;
      }
    } catch (error) {
      error instanceof Error
        ? { message: error.toString() }
        : { message: "An error occurred" };
        return error;
    }
  };

  export const deleteComment = (commentId: number) => async () => {

    const response = await fetch(`/api/comments/${commentId}/`, {
      method: 'DELETE'
    })
    if(response.ok) {
        const comment = await response.json();

        return comment
    }
    else {
        return response
    }
  }
