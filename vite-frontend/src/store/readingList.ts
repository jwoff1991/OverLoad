const GET_LIST = "list/get";
const CLEAR_LIST = "CLEAR_LIST";

import { Dispatch } from "redux";

const getReadingList = (data: {}) => {
  return {
    type: GET_LIST,
    readingList: data,
  };
};

const clearReadingList = () => {
  return {
    type: CLEAR_LIST,
  };
};

export const clearUserReadingList = () => async (dispatch: Dispatch) => {
  dispatch(clearReadingList());
  return;
};

export const getUserReadingList = () => async (dispatch: Dispatch) => {
  try {
    const response = await fetch(`/api/reading-list/`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(getReadingList(data));
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

export const addToReadingList =
  (articleId: Number, userId: Number) => async () => {
    const response = await fetch(
      `/api/reading-list/add/${articleId}/${userId}/`,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      const article = await response.json();
      return article;
    } else {
      return response;
    }
  };

export const removeFromReadingList =
  (articleId: Number, userId: Number) => async () => {
    const response = await fetch(
      `/api/reading-list/remove/${userId}/${articleId}/`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const article = await response.json();
      return article;
    } else {
      return response;
    }
  };

const initialState = {
  readingList: {},
};

const readingListReducer = (
  state = initialState,
  action: { type: typeof GET_LIST | typeof CLEAR_LIST; readingList: any }
) => {
  let newState;
  switch (action.type) {
    case GET_LIST:
      newState = action.readingList;
      return newState;
    case CLEAR_LIST:
      return {};
    default:
      return state;
  }
};
export default readingListReducer;
