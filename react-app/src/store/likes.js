import { getOneArticle } from "./articles";


export const addLike = (articleId, userId) => async (dispatch) => {
    const response = await fetch(`/api/article-likes/add/${articleId}/${userId}/`, {
        method: "POST",
      });
      if (response.ok) {
        const like = await response.json();
        const waiting = await dispatch(getOneArticle(articleId));
        return like;
      } else {
        return response;
      }
}


export const removeLike = (articleId, userId) => async (dispatch) => {
    const response = await fetch(`/api/article-likes/remove/${userId}/${articleId}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        const article = await response.json();
        dispatch(getOneArticle(articleId))
        return article;
      } else {
        return response;
      }
    }
