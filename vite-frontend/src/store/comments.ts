import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import store from '.';
import {getOneArticle} from './articles'
import { createErrorObject } from '../helperFunctions';


type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>


type NewComment = {
  article_id: number,
  user_id: number,
  body: String,
}

type EditedComment = {
  id: number;
  user_id: number;
  body: string;
}

export const postComment = (comment: NewComment) => async (dispatch: AppDispatch) => {
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
      return createErrorObject(error);
    }
  };

  export const editComment = (comment: EditedComment) => async (dispatch: AppDispatch) => {
    const id = comment.id
    try {
      const request = await fetch(`/api/comments/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if(request.ok) {
          const data = await request.json();
          const editedComment = data;
          dispatch(getOneArticle(editedComment.article_id));
          return editedComment;
      } else {
        const errors = await request.json();
        return errors;
      }
    } catch (error) {
      return createErrorObject(error);
    }
  };

  export const deleteComment = (commentId: number) => {
    return async (dispatch: AppDispatch) => {
      try {
        const response = await fetch(`/api/comments/${commentId}/`, {
          method: 'DELETE'
        });
        if (response.ok) {
          const comment = await response.json();
          dispatch({ type: 'DELETE_COMMENT_SUCCESS', comment });
        } else {
          const errorText = await response.text();
          dispatch({ type: 'DELETE_COMMENT_FAILURE', error: errorText });
        }
        return true;
      } catch (error) {
        console.error("An error occurred during comment deletion:", error);
        return false;
      }
    };
  };
