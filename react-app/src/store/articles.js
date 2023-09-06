const GET_ARTICLES = '/articles/getAll'
const GET_SINGLE = '/article/single'

const getArticles = (data) => {
  return {
    type: GET_ARTICLES,
    articles: data,
  };
};

const getSingleArticle = (data) => {
  return {
    type: GET_SINGLE,
    article: data,
  };
};

export const getAllArticles = () => async (dispatch) => {
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
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

export const getOneArticle = (id) => async (dispatch) => {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(getSingleArticle(data));
      return data;
    } else {
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    const errors =
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

export const postArticle = (article) => async (dispatch) => {
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
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

export const editArticle = (article) => async (dispatch) => {
  try {
    let id = article.id;
    console.log("WE HITTING THIS", id);
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
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

export const deleteArticle = (id) => async (dispatch) => {
    const response = await fetch(`/api/articles/${id}/`, {
        method: 'DELETE'
    })
    if(response.ok) {
        const article = await response.json();
        return article
    }
    else {
        return response
    }
}


const initialState = {
    allArticles: {},
    singleArticle: {}
}

const articleReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case GET_ARTICLES:
            newState = Object.assign({ ...state })
            newState.allArticles = action.articles
            return newState
        case GET_SINGLE:
            newState = Object.assign({ ...state })
            newState.singleArticle = action.article
            return newState
        default:
            return state;
    }
}

export default articleReducer
