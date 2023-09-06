import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllArticles } from "../../store/articles";

const ArticlesComponent = () => {
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const articles = useSelector((state) => state.articles.allArticles)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllArticles());
        setIsLoaded(true)
      }, [dispatch, isLoaded]);

    const articlesList = Object.values(articles)
    console.log(articlesList)

    return (
        <>
        <h1>Hello</h1>
            <div className="articles-container">
                {articlesList.map(({ id, author, title, body, date_created }) => (
                    <div key={id} className="full-article-div">
                        <div className="article-author-and-date">
                            <div className="author">{author.firstname} {author.lastname}</div>
                            <div className="date-created">{date_created}</div>
                        </div>
                        <div className="article-title">{title}</div>
                        <div className="article-body">{body}</div>
                    </div>
                ))}
            </div>
        </>
    )
};

export default ArticlesComponent;
