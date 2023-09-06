const GET_ARTICLES = '/articles/getAll'

const getArticles = (data) => {
    return {
        type: GET_ARTICLES,
        articles: data
    }
}


export const getAllArticles = () => async (dispatch) => {
    try {
        const response = await fetch('/api/articles/all');
        if(response.ok) {
            const data = await response.json();
            dispatch(getArticles(data));
            return data;
        } else {
            const errors = await response.json();
            return errors;
        }
    } catch (error) {
        const errors = (error && error.json) ? await error.json() : { message: error.toString() };
        return errors;
    }
}


const initialState = {
    allArticles: {}
}

const articleReducer = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case GET_ARTICLES:
            newState = Object.assign({ ...state })
            newState.allArticles = action.articles
            return newState
        default:
            return state;
    }
}

export default articleReducer
