import getOneArticle from './articles'

export const postComment = (comment) => async (dispatch) => {
    try {
      const request = await fetch("/api/comments/new-comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      const data = await request.json();
      const newComment = data;
      dispatch(getOneArticle(newComment.article_id));
      return newComment;
    } catch (error) {
      const errors =
        error && error.json ? await error.json() : { message: error.toString() };
      return errors;
    }
  };

  export const editComment = (comment) => async (dispatch) => {
    const id = comment.id
    try {
      const request = await fetch(`/api/comments/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      const data = await request.json();
      const editedComment = data;
      dispatch(getOneArticle(editedComment.article_id));
      return editedComment;
    } catch (error) {
      const errors =
        error && error.json ? await error.json() : { message: error.toString() };
      return errors;
    }
  };

  export const deleteComment = (commentId) => async (dispatch) => {

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
