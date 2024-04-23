import { Dispatch } from "redux";

import { ArticleType } from "../typeDeclerations";
import { createErrorObject } from "../helperFunctions";

type newArticle = {
  user_id: number;
  title: string;
  body: string;
}

//actiontype
const GET_ARTICLES = "/articles/getAll";
const GET_SINGLE = "/article/single";

//actioncreators
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
      articles = articles.sort((a: ArticleType, b: ArticleType) => b.id - a.id);
      dispatch(getArticles(articles));
      return articles;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    return createErrorObject(error);
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
    return createErrorObject(error);
  }
};

export const postArticle = (article: newArticle) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch("/api/articles/new-article/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    if(response.ok) {
      const newArticle = await response.json();
      dispatch(getSingleArticle(newArticle));
      return newArticle;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    return createErrorObject(error)
  }
};

export const editArticle = (article: ArticleType) => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`/api/articles/edit/${article.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    if (response.ok) {
      const editedArticle = await response.json();
      dispatch(getSingleArticle(editedArticle));
      return editedArticle;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    return createErrorObject(error);
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
    const errors = await response.json();
    return errors;
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
