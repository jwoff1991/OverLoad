import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import store from ".";
import { getOneArticle } from "./articles";
import { createErrorObject } from "../helperFunctions";

type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>;

export const addLike =
  (articleId: string, userId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `/api/article-likes/add/${articleId}/${userId}/`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        const like = await response.json();
        dispatch(getOneArticle(articleId));
        return like;
      } else {
        const errors = await response.json();
        return errors;
      }
    } catch (error) {
      return createErrorObject(error);
    }
  };

export const removeLike =
  (articleId: string, userId: number) => async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `/api/article-likes/remove/${userId}/${articleId}/`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const article = await response.json();
        dispatch(getOneArticle(articleId));
        return article;
      } else {
        const errors = await response.json();
        return errors;
      }
    } catch (error) {
      return createErrorObject(error);
    }
  };
