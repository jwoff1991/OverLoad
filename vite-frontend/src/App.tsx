// import ReactGA from 'react-ga';
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import store from './store/index.ts';

// const TRACKING_ID = "G-CEEJHMT4H8"; // YOUR_OWN_TRACKING_ID
// ReactGA.initialize(TRACKING_ID);

import './index.css'
import Navigation from './components/Navigation';
import ArticlesComponent from "./components/Articles/ArticlesComponent/index.tsx";
import SingleArticle from "./components/Articles/SingleArticleComponent/index.tsx";
import CreateNewArticle from "./components/Articles/CreateArticle/index.tsx";
import EditArticle from "./components/Articles/EditArticle/index.tsx";
import ReadingListComponent from "./components/ReadingList/index.tsx";
import MyStoryComponent from "./components/MyStoryComponent/index.tsx";
import CreateComponent from "./components/CreateComponent/index.tsx";

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
          <Route path="/login">{/* <LoginFormPage /> */}</Route>
          <Route path="/signup">{/* <SignupFormPage /> */}</Route>
          <Route path="/" element={<ArticlesComponent />} />
          <Route path="/articles/:id" element={<SingleArticle />} />
          <Route path="/new-article" element={<CreateNewArticle />} />
          <Route path="/article/:id/edit" element={<EditArticle />} />
          <Route
            path="/:userid/reading-list"
            element={<ReadingListComponent />}
          />
          <Route path="/my-story" element={<MyStoryComponent />} />
          <Route path="/create" element={<CreateComponent />} />
        </Routes>
      )}
    </>
  );
}

export default App
