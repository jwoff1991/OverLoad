import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../../store/articles";
import { NavLink } from 'react-router-dom';
import './articlesComponent.css'

const ArticlesComponent = () => {
    const dispatch = useDispatch();

    const articles = useSelector((state) => state.articles.allArticles)

    useEffect(() => {
        dispatch(getAllArticles());
      }, [dispatch]);

    const articlesList = Object.values(articles)

    return (
        <>
            <div className="articles-container">
                {articlesList.map(({ id, author, title, body, date_created }) => (
                    <NavLink key={id} to={`/articles/${id}`} className='text-link'>
                        <div className="full-article-div">
                            <div className="article-author-and-date">
                                <div className="author">{author.firstname} {author.lastname}</div>
                                <div className="date-created">{date_created}</div>
                            </div>
                            <div className="article-title">{title}</div>
                            <div className="article-body">{body}</div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
};

export default ArticlesComponent;
