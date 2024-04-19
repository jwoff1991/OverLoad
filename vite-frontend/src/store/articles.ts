import { Dispatch } from "redux";

import { ArticleType } from "../typeDeclerations";

type newArticle = {
  user_id: number;
  title: string;
  body: string;
}

//actiontype
const GET_ARTICLES = "/articles/getAll";
const GET_SINGLE = "/article/single";

//actioncreator
const getArticles = (articles: {}) => {
  return {
    type: GET_ARTICLES,
    payload: articles,
  };
};

const getSingleArticle = (article: {}) => {
  return {
    type: GET_SINGLE,
    payload: article,
  };
};

//thunk
export const getAllArticles = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch("/api/articles/all", {
      method: "GET",
    });
    if (response.ok) {
      let articles = await response.json();
      // Sort the articles in the desired order before dispatching
      articles = articles.sort((a: ArticleType, b: ArticleType) => b.id - a.id);
      dispatch(getArticles(articles));
      return articles;
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

export const getOneArticle = (id: number | string) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: "GET",
    });
    const res = await fetch(`/api/comments/${id}/all`, {
      method: "GET",
    });
    const likeResponse = await fetch(`/api/article-likes/${id}`);
    if (response.ok) {
      const article = await response.json();
      const commentData = await res.json();
      article["comments"] = commentData;

      const likeData = await likeResponse.json();
      article["likes"] = likeData;

      dispatch(getSingleArticle(article));
      return article;
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

export const postArticle = (article: newArticle) => async (dispatch: Dispatch) => {
  try {
    const request = await fetch("/api/articles/new-article/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const newArticle = await request.json();
    dispatch(getSingleArticle(newArticle));
    return newArticle;
  } catch (error) {
    const errors =
      error instanceof Error
        ? { message: error.toString() }
        : { message: "An error occurred" };
    return errors;
  }
};

export const editArticle = (article: ArticleType) => async (dispatch: Dispatch) => {
  try {
    let id = article.id;
    const request = await fetch(`/api/articles/edit/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const editedArticle = await request.json();
    if (editedArticle.ok) {
      dispatch(getSingleArticle(editedArticle));
      return editedArticle;
    }
  } catch (error) {
    const errors =
      error instanceof Error
        ? { message: error.toString() }
        : { message: "An error occurred" };
    return errors;
  }
};

export const deleteArticle = (id: number) => async () => {
  const response = await fetch(`/api/articles/${id}/`, {
    method: "DELETE",
  });
  if (response.ok) {
    const article = await response.json();
    return article;
  } else {
    return response;
  }
};

const initialState = {
  allArticles: {},
  singleArticle: {},
};

const articleReducer = (
  state = initialState,
  action: {
    type: typeof GET_ARTICLES | typeof GET_SINGLE;
    payload: {} | null;
  }
) => {
  let newState;
  switch (action.type) {
    case GET_ARTICLES:
      newState = Object.assign({ ...state });
      newState['allArticles'] = action.payload;
      return newState;
    case GET_SINGLE:
      newState = Object.assign({ ...state });
      newState.singleArticle = action.payload;
      return newState;
    default:
      return state;
  }
};

export default articleReducer;
