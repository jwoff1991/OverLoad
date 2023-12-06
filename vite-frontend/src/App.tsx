import ReactGA from 'react-ga';
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "./store/session";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import store from './store/index.ts';

const TRACKING_ID = "G-CEEJHMT4H8"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

import './index.css'
import Navigation from './components/Navigation';

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
          <Route path="/login" >
            {/* <LoginFormPage /> */}
          </Route>
          <Route path="/signup">
            {/* <SignupFormPage /> */}
          </Route>
          <Route path='/'>
            {/* <ArticlesComponent /> */}
          </Route>
          <Route path='/articles/:id' >
            {/* <SingleArticle /> */}
          </Route>
            <Route path='/new-article' >
            {/* <CreateNewArticle /> */}
            </Route>
            <Route path='/article/:id/edit' >
              {/* <EditArticle /> */}
            </Route>
            <Route path='/:userid/reading-list' >
              {/* <ReadingListComponent /> */}
            </Route>
            <Route path='/my-story' >
              {/* <MyStoryComponent /> */}
            </Route>
            <Route path='/create' >
              {/* <CreateComponent /> */}
            </Route>
        </Routes>
      )}
    </>
  )
}

export default App
