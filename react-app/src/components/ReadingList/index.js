import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserReadingList } from "../../store/readingList";
import { NavLink } from 'react-router-dom';
import './readingListComponent.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";



const ReadingListComponent = () => {
    const userId = useParams()
    const dispatch = useDispatch();
    const readingList = useSelector((state) => state.readingListReducer)
    const readingListAll = Object.values(readingList)
    useEffect(() => {
        dispatch(getUserReadingList(userId));
      }, [dispatch, userId]);


    if(readingListAll && readingListAll[0].article) {
    readingListAll.forEach(article => {
        let articlebody = article.article.body
        console.log(articlebody)
        let newArticleBody = articlebody.split('').slice(0, 150).join('')
        article.article.body = newArticleBody
        let createdAtSplit = article.article.date_created.split('').slice(5, 11).join('')
        article.article.date_created = createdAtSplit
    })
    }

    return (
        <>
        {readingListAll && readingListAll[0].article && (
        <div className="reading-list-topics-footer-container">
            <div className="reading-list-container">
                {readingListAll.map(({ article }) => (
                    <NavLink key={article.id} to={`/articles/${article.id}`} className='text-link'>
                        <div className="full-article-div">
                            <div className="date-author-reading-list-div">
                                <div className="date-article-author">
                                    <div className="author">{article.author.firstname} {article.author.lastname}</div>
                                    <span>&#183;</span>
                                    <div className="date-created">{article.date_created}</div>
                                </div>
                                <button className="reading-list-button">Reading List Button</button>
                            </div>
                            <div className="article-title">{article.title}</div>
                            <div className="article-body">{article.body}...</div>
                        </div>
                    </NavLink>
                ))}
            </div>
            
        </div>
        )}
        </>
    )
}

export default ReadingListComponent
