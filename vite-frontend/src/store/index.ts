import { configureStore, Middleware } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import articleReducer from './articles';
import readingListReducer from './readingList';
import userReducer from './session';


// Define the root reducer
const rootReducer = combineReducers({
  articles: articleReducer,
  readingList: readingListReducer,
  session: userReducer,
});

// Define the middlewares
const middlewares: Middleware[] = [thunk as ThunkMiddleware];

// Add logger middleware in development
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middlewares.push(logger);
}

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});



export default store;
