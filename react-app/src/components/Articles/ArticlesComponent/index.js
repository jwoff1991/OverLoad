import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../../store/articles";
import { NavLink } from 'react-router-dom';
import './articlesComponent.css'

const ArticlesComponent = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const articles = useSelector((state) => state.articles.allArticles)

    useEffect(() => {
        dispatch(getAllArticles());
      }, [dispatch]);

    const articlesList = Object.values(articles)

    return (
        <>
        {sessionUser ? (
        <>
        <div className="articles-topics-footer-container">
            <div className="articles-container">
                {articlesList.map(({ id, author, title, body, date_created }) => (
                    <NavLink key={id} to={`/articles/${id}`} className='text-link'>
                        <div className="full-article-div">
                            <div className="date-article-author">
                                <div className="author">{author.firstname} {author.lastname}</div>
                                <span>&#183;</span>
                                <div className="date-created">{date_created}</div>
                            </div>
                            <div className="article-title">{title}</div>
                            <div className="article-body">{body}</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
        </>
        ) : (
        <>
        <div className="user-not-logged-in-div">stuff</div>
        <div className="articles-topics-footer-container">
            <div className="articles-container">
                {articlesList.map(({ id, author, title, body, date_created }) => (
                    <NavLink key={id} to={`/articles/${id}`} className='text-link'>
                        <div className="full-article-div">
                            <div className="article-author">
                                <div className="author">{author.firstname} {author.lastname}</div>
                            </div>
                            <div className="article-title">{title}</div>
                            <div className="article-body">{body}</div>
                            <div className="date-created">{date_created}</div>
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
