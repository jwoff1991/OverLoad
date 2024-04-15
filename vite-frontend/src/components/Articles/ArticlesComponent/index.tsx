import Footer from "../../Footer";
import StaffPicks from "../StaffPicks";
import ReadingListAddButtonComponent from "../../ReadingList/addToReadingListButton";
import ReadingListRemoveButtonComponent from "../../ReadingList/removeFromReadingListButton";
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import { getAllArticles } from "../../../store/articles";
import { StateType, AppDispatch } from "../../../typeDeclerations";
import { useDispatch, useSelector } from "react-redux";
import { clearUserReadingList, getUserReadingList } from "../../../store/readingList";
import './articlesComponent.css'
import { articleDateConverter, articleBodyConverter, userReadingListArticleIds } from "../../../helperFunctions";


const ArticlesComponent = () => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const sessionUser = useSelector((state: StateType) => state.session.user);
    const articles = useSelector((state: StateType) => state.articles.allArticles)
    const readingList = useSelector((state: StateType) => state.readingList)


    useEffect(() => {
        dispatch(getAllArticles());
        if(sessionUser && sessionUser.id) {
            dispatch(clearUserReadingList())
            dispatch(getUserReadingList());
        }
      }, [dispatch, sessionUser]);

      const articlesList = Object.values(articles)

    const userReadingListIds: number[] = userReadingListArticleIds(Object.values(readingList));
    return (
      <>
        {sessionUser ? (
          <>
            <div className="articles-topics-footer-container">
              <div className="articles-container">
                {articlesList.map(
                  ({ id, author, title, body, date_created }) => (
                    <NavLink
                      key={id}
                      to={`/articles/${id}`}
                      className="text-link"
                    >
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
                          {userReadingListIds.includes(id) ? (
                            <>
                              <ReadingListRemoveButtonComponent
                                articleId={id}
                                userId={sessionUser.id}
                              />
                            </>
                          ) : (
                            <>
                              <ReadingListAddButtonComponent
                                articleId={id}
                                userId={(sessionUser.id)}
                              />
                            </>
                          )}
                        </div>
                        <div className="article-title">{title}</div>
                        <div className="article-body">
                          {articleBodyConverter(body)}
                        </div>
                      </div>
                    </NavLink>
                  )
                )}
              </div>
              <div className="topics-footer-container-user-logged-in">
                <div className="staff-picks-user-logged-in">
                  <StaffPicks />
                  <Footer />
                </div>
                <div className="footer-user-not-logged-in"></div>
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
                {articlesList.map(
                  ({ id, author, title, body, date_created }) => (
                    <NavLink
                      key={id}
                      to={`/articles/${id}`}
                      className="text-link"
                    >
                      <div className="full-article-div">
                        <div className="article-author">
                          <div className="author">
                            {author.firstname} {author.lastname}
                          </div>
                        </div>
                        <div className="article-title">{title}</div>
                        <div className="article-body">
                          {articleBodyConverter(body)}...
                        </div>
                        <div className="date-created">
                          {articleDateConverter(date_created)}
                        </div>
                      </div>
                    </NavLink>
                  )
                )}
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
