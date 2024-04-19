import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllArticles } from "../../../store/articles";
import { clearUserReadingList, getUserReadingList } from "../../../store/readingList";
import { StateType, AppDispatch, ArticleType } from "../../../typeDeclerations";
import { articleDateConverter, articleBodyConverter } from "../../../helperFunctions";

import Footer from "../../Footer";
import StaffPicks from "../StaffPicks";
import ReadingListButton from "../../readingListButton";

import './articlesComponent.css'

const ArticlesComponent = () => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const sessionUser = useSelector((state: StateType) => state.session.user);
    const articlesList = useSelector((state: StateType) =>
      Object.values(state.articles.allArticles)
    );

    useEffect(() => {
      dispatch(getAllArticles());
      if (sessionUser && sessionUser.id) {
        dispatch(clearUserReadingList());
        dispatch(getUserReadingList());
      }
    }, [dispatch, sessionUser]);

    const ArticleLink = ({ id, author, title, body, date_created }: ArticleType) => (
      <NavLink key={id} to={`/articles/${id}`} className="text-link">
        <div className="full-article-div">
          <div className="date-author-reading-list-div">
            <div className="date-article-author">
              <div className="author">
                {author.firstname} {author.lastname}
              </div>
              <span>&#183;</span>
              <div className="date-created">
                {articleDateConverter(date_created)}
              </div>
            </div>
            {sessionUser && <ReadingListButton articleId={id} />}
          </div>
          <div className="article-title">{title}</div>
          <div className="article-body">{articleBodyConverter(body)}</div>
        </div>
      </NavLink>
    );

    return (
      <>
        {sessionUser ? (
          <>
            <div className="articles-topics-footer-container">
              <div className="articles-container">
                {articlesList.map((article) => (
                  <ArticleLink {...article} />
                ))}
              </div>
              <div className="topics-footer-container-user-logged-in">
                <div className="staff-picks-user-logged-in">
                  <StaffPicks />
                  <Footer />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="user-not-logged-in-div">
              <div className="div-next-to-image">
                <h1>Welcome to OverLoad</h1>
                <h4>(a Medium.com clone)</h4>
                <p>
                  Feel free to navigate the site, you can create your own
                  signin, or login as a demo user. You can also, create an
                  article, or comment on one you find interesting! If you have
                  any questions or want to find out more about the sourcecode,
                  visit the My Story link!
                </p>
              </div>
              <img
                className="image-for-front-page"
                src="/icons/frontpageimage.png"
                alt="blue honeycomb"
              />
            </div>
            <div className="articles-topics-footer-container">
              <div className="articles-container">
                {articlesList.map((article) => (
                  <ArticleLink {...article} />
                ))}
              </div>
              <div className="topics-footer-container-user-not-logged-in">
                <div className="staff-picks-user-not-logged-in">
                  <StaffPicks />
                  <Footer />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
};

export default ArticlesComponent;
