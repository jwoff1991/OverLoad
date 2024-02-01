import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import store from "./store";

type UserType = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    bio: string;
  }
  type ArticleType = {
    author: UserType;
    body: string;
    date_created: string;
    id: number;
    title: string;
    likes: string;
  }
  type StateType = {
    articles: {
      allArticles: ArticleType[];
      singleArticle: ArticleType;
    };
    session: {
      user: UserType; // Replace UserType with the actual type of user
    };
    readingList: [{
      article: ArticleType;
      article_id: number;
      id: number;
      user_id: number;
    }];
    }

    type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>

    export type { UserType, ArticleType, StateType, AppDispatch };
