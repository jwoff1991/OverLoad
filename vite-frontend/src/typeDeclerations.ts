import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import store from "./store";


type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>

type LoginErrorsType = {
  email: string | null;
  password: string | null;
};

type NewComment = {
  article_id: number;
  user_id: number;
  body: String;
};

type ArticleErrorsType = {
  title: string,
  body: string
}

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
  };

  type CommentType = {
    article: ArticleType;
    article_id: number;
    body: string;
    commenter: UserType;
    date_created: string;
    id: number;
    user_id: number;
  };

  type LikesType = {
    article_id: number;
    id: number;
    user_id: number;
  };

  type SingleArticleType = {
    author: UserType;
    body: string;
    comments: CommentType[];
    date_created: string;
    id: number;
    likes: LikesType[];
    title: string;
    user_id: number;
  };

  type StateType = {
    articles: {
      allArticles: ArticleType[];
      singleArticle: SingleArticleType;
    };
    session: {
      user: UserType; // Replace UserType with the actual type of user
    };
    readingList: [
      {
        article: ArticleType;
        article_id: number;
        id: number;
        user_id: number;
      }
    ];
  };


    export type { NewComment, ArticleErrorsType, UserType, ArticleType, StateType, AppDispatch, SingleArticleType, LoginErrorsType, CommentType, LikesType};
