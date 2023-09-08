const GET_LIST = "list/get";

const getReadingList = (data) => {
  return {
    type: GET_LIST,
    readingList: data,
  };
};

export const getUserReadingList = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/reading-list/${userId}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      console.log('good DATA',data)
      dispatch(getReadingList(data));
      return data;
    } else {
    console.log('bad DATA')
      const errors = await response.json();
      return errors;
    }
  } catch (error) {
    const errors =
      error && error.json ? await error.json() : { message: error.toString() };
    return errors;
  }
};

const initialState = {
  readingList: {},
};

const readingListReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_LIST:
      newState = Object.assign({ ...state });
      newState = action.readingList;
      return newState;
    default:
      return state;
  }
};
export default readingListReducer;
