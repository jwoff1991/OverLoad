import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import store from './store/index.ts';

import Navigation from './components/Navigation';
import ArticlesComponent from "./components/Articles/ArticlesComponent/index.tsx";
import SingleArticle from "./components/Articles/SingleArticleComponent/index.tsx";
import CreateNewArticle from "./components/Articles/CreateArticle/index.tsx";
import EditArticle from "./components/Articles/EditArticle/index.tsx";
import ReadingListComponent from "./components/ReadingList/index.tsx";
import MyStoryComponent from "./components/MyStoryComponent/index.tsx";
import CreateComponent from "./components/CreateComponent/index.tsx";
import NotFoundComponent from "./components/NotFoundComponent/index.tsx";

import './index.css'
import UserProfile from "./components/UserProfile/userProfile.tsx";

type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>


function App() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Routes>
          <Route path="/" element={<ArticlesComponent />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/articles/:id" element={<SingleArticle />} />
          <Route path="/new-article" element={<CreateNewArticle />} />
          <Route path="/article/:id/edit" element={<EditArticle />} />
          <Route
            path="/:userid/reading-list"
            element={<ReadingListComponent />}
          />
          <Route path="/my-story" element={<MyStoryComponent />} />
          <Route path="/create" element={<CreateComponent />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      )}
    </>
  );
}

export default App
