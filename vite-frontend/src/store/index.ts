import { configureStore, Middleware } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux';
import articleReducer from './articles';

// Define the root reducer
const rootReducer = combineReducers({
  articles: articleReducer,
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
