import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import ArticlesComponent from "./components/Articles/ArticlesComponent";
import SingleArticle from "./components/Articles/SingleArticleComponent";
import CreateNewArticle from "./components/Articles/CreateArticle";
import EditArticle from "./components/Articles/EditArticle";
import ReadingListComponent from "./components/ReadingList";
import MyStoryComponent from "./components/MyStoryComponent";
import CreateComponent from "./components/CreateComponent";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/' exact>
            <ArticlesComponent />
          </Route>
          <Route path='/articles/:id' exact>
            <SingleArticle />
          </Route>
            <Route path='/new-article' exact>
            <CreateNewArticle />
            </Route>
            <Route path='/article/:id/edit' exact>
              <EditArticle />
            </Route>
            <Route path='/:userid/reading-list' exact>
              <ReadingListComponent />
            </Route>
            <Route path='/my-story' exact>
              <MyStoryComponent />
            </Route>
            <Route path='/create' exact>
              <CreateComponent />
            </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
