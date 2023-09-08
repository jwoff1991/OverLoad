import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserReadingList } from "../../store/readingList";
import { NavLink } from 'react-router-dom';
import './readingListComponent.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";



const ReadingListComponent = () => {

    const userId = useParams()
    const dispatch = useDispatch();
    const readingListAll = useSelector((state) => state.articles.allArticles)
    useEffect(() => {
        dispatch(getUserReadingList(userId));
      }, [dispatch, userId]);


    return (
        <>
        <div className="reading-list-topics-footer-container">
            <div className="reading-list-container">
                {/* {readingListAll.map(({ id, author, title, body, date_created }) => (
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
                ))} */}
            </div>
        </div>
        </>
    )
}

export default ReadingListComponent
