import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../../store/articles";
import { NavLink } from 'react-router-dom';
import './articlesComponent.css'

const ArticlesComponent = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const articles = useSelector((state) => state.articles.allArticles)
    const readingList = useSelector((state) => state.readingListReducer)

    useEffect(() => {
        dispatch(getAllArticles());
        // dispatch(getUserReadingList(sessionUser.id))
      }, [dispatch]);

    const articlesList = Object.values(articles)
    articlesList.forEach(article => {
        let articlebody = article.body
        let newArticleBody = articlebody.split('').slice(0, 150).join('')
        article.body = newArticleBody
        let createdAtSplit = article.date_created.split('').slice(5, 11).join('')
        article.date_created = createdAtSplit
    })

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
                                    <div className="date-created">{date_created}</div>
                                </div>
                                <button className="reading-list-button">Reading List Button</button>
                            </div>
                            <div className="article-title">{title}</div>
                            <div className="article-body">{body}...</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
        </>
        ) : (
        <>
        <div className="user-not-logged-in-div"><img src='./5302912.jpeg' alt='blue honeycomb' /></div>
        <div className="articles-topics-footer-container">
            <div className="articles-container">
                {articlesList.map(({ id, author, title, body, date_created }) => (
                    <NavLink key={id} to={`/articles/${id}`} className='text-link'>
                        <div className="full-article-div">
                            <div className="article-author">
                                <div className="author">{author.firstname} {author.lastname}</div>
                            </div>
                            <div className="article-title">{title}</div>
                            <div className="article-body">{body}...</div>
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
