import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getUserReadingList,
  removeFromReadingList,
} from "../../store/readingList";
import { NavLink } from 'react-router-dom';
import './readingListComponent.css'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ReadingListRemoveButtonComponent from "./removeFromReadingListButton";

const ReadingListComponent = () => {
  const userId = useParams().userid;
  const dispatch = useDispatch();
  const readingList = useSelector((state) => state.readingList);
  const sessionUser = useSelector((state) => state.session.user);
  const readingListAll = Object.values(readingList);

  useEffect(() => {
    dispatch(getUserReadingList(userId));
  }, [dispatch, userId]);

  const articleBodyConverter = (body) => {
    let newArticleBody = body.split("").slice(0, 150).join("");
    return newArticleBody;
  };
  const articleDateConverter = (date) => {
    let createdAtSplit = date.split("").slice(5, 11).join("");
    return createdAtSplit;
  };
  return (
    <>
      <div className="reading-list-topics-footer-container">
        <div className="user-information">
          <div className="username">{sessionUser.username}</div>
          <div className="list-length">
            {readingListAll && readingListAll.length && readingList[0] ? (
              <>{readingListAll.length} Article(s)</>
            ) : (
              <>0 Articles</>
            )}
          </div>
        </div>
        <div className="heading-div">
          <h1>Reading List</h1>
        </div>
        {readingListAll && readingListAll[0].article && (
          <>
            <div className="reading-list-container">
              {readingListAll.map(({ article }) => (
                <div className="full-article-div">
                  <div className="date-author-reading-list-div">
                    <div className="date-article-author">
                      <div className="author">
                        {article.author.firstname} {article.author.lastname}
                      </div>
                      <span>&#183;</span>
                      <div className="date-created">
                        {articleDateConverter(article.date_created)}
                      </div>
                    </div>
                    <ReadingListRemoveButtonComponent props={[article.id, userId]} />
                  </div>
                  <NavLink
                    key={article.id}
                    to={`/articles/${article.id}`}
                    className="text-link"
                  >
                    <div className="article-title">{article.title}</div>
                    <div className="article-body">
                      {articleBodyConverter(article.body)}...
                    </div>
                  </NavLink>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ReadingListComponent
