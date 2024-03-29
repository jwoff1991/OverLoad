import { Dispatch } from "redux";

type article = {
    id: number;
    user_id: number;
    title: string;
    body: string;
};

type newArticle = {
  user_id: number;
  title: string;
  body: string;
}


const GET_ARTICLES = "/articles/getAll";
const GET_SINGLE = "/article/single";

const getArticles = (data: {}) => {
  return {
    type: GET_ARTICLES,
    articles: data,
  };
};

const getSingleArticle = (data: {}) => {
  return {
    type: GET_SINGLE,
    article: data,
  };
};

export const getAllArticles = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch("/api/articles/all", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(getArticles(data));
      return data;
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
      const data = await response.json();
      const commentData = await res.json();
      data["comments"] = commentData;

      const likeData = await likeResponse.json();
      data["likes"] = likeData;

      dispatch(getSingleArticle(data));
      return data;
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
    const data = await request.json();
    const newArticle = data;
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

export const editArticle = (article: article) => async (dispatch: Dispatch) => {
  try {
    let id = article.id;
    const request = await fetch(`/api/articles/edit/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
    const data = await request.json();
    if (data.ok) {
      const newArticle = data;
      dispatch(getSingleArticle(newArticle));
      return newArticle;
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
    articles: {} | null;
    article: {} | null;
  }
) => {
  let newState;
  switch (action.type) {
    case GET_ARTICLES:
      newState = Object.assign({ ...state });
      newState.allArticles = action.articles;
      return newState;
    case GET_SINGLE:
      newState = Object.assign({ ...state });
      newState.singleArticle = action.article;
      return newState;
    default:
      return state;
  }
};

export default articleReducer;
