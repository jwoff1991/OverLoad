import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../../store/articles";
import { NavLink } from 'react-router-dom';
import './articlesComponent.css'
import { getUserReadingList } from "../../../store/readingList";

const ArticlesComponent = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const articles = useSelector((state) => state.articles.allArticles)
    const readingList = useSelector((state) => state.readingList)


    useEffect(() => {
        dispatch(getAllArticles());
        if(sessionUser && sessionUser.id) {
            dispatch(getUserReadingList(sessionUser.id))
        }
      }, [dispatch, sessionUser]);

    const articlesList = Object.values(articles)
    const articleBodyConverter = (body) => {
        let newArticleBody = body.split('').slice(0, 150).join('')
        return newArticleBody
      }
      const articleDateConverter =(date) => {
        let createdAtSplit = date.split('').slice(5, 11).join('')
        return createdAtSplit
      }

    return (
        <>
        {sessionUser ? (
        <>
        <div className="articles-topics-footer-container">
            <div className="articles-container">
                {articlesList.map(({ id, author, title, body, date_created }) => (
                    <NavLink key={id} to={`/articles/${id}`} className='text-link'>
                        <div className="full-article-div">
                            <div className="date-author-reading-list-div">
                                <div className="date-article-author">
                                    <div className="author">{author.firstname} {author.lastname}</div>
                                    <span>&#183;</span>
                                    <div className="date-created">{articleDateConverter(date_created)}</div>
                                </div>
                                <button className="reading-list-button"><img className='bookmark-icon' src='/icons/bookmark_10330015.png' alt='bookmark'/></button>
                            </div>
                            <div className="article-title">{title}</div>
                            <div className="article-body">{articleBodyConverter(body)}...</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
        </>
        ) : (
        <>
        <div className="user-not-logged-in-div">
            <div className="div-next-to-image" >This will have content with information about the site</div>
            <img className='image-for-front-page'src='/icons/frontpageimage.png' alt='blue honeycomb' />
        </div>
        <div className="articles-topics-footer-container">
            <div className="articles-container">
                {articlesList.map(({ id, author, title, body, date_created }) => (
                    <NavLink key={id} to={`/articles/${id}`} className='text-link'>
                        <div className="full-article-div">
                            <div className="article-author">
                                <div className="author">{author.firstname} {author.lastname}</div>
                            </div>
                            <div className="article-title">{title}</div>
                            <div className="article-body">{articleBodyConverter(body)}...</div>
                            <div className="date-created">{articleDateConverter(date_created)}</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
        </>)}
        </>
    )
};

export default ArticlesComponent;
