import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserReadingList } from "../../store/readingList";
import { NavLink } from "react-router-dom";
import "./readingListComponent.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ReadingListRemoveButtonComponent from "./removeFromReadingListButton";
import SpinnerLoadingScreen from "../LoadingScreen";

const ReadingListComponent = () => {
  const userId = useParams().userid;
  const dispatch = useDispatch();
  const readingList = useSelector((state) => state.readingList);
  const sessionUser = useSelector((state) => state.session.user);
  const readingListAll = Object.values(readingList);
  const state = useSelector((state) => state);
  console.log(state)

  useEffect(() => {
    dispatch(getUserReadingList(userId));
  }, [dispatch, userId, sessionUser]);


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

// Truncates article body to no more than 150 characters for preview
const articleBodyConverter = (body) => {
  return body.length > 150 ? `${body.substring(0, 150)}...` : body;
};

// Converts date_created to a more readable format (assuming date is in ISO format)
const articleDateConverter = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Gets the count of articles in the user's reading list
const readingListDisplay = (readingListAll) => {
  const articleCount = readingListAll?.length || 0;
  return <>{articleCount} Article(s)</>;
};

  return (
    <>
      {loading ? (
        <SpinnerLoadingScreen />
      ) : (
        <div className="reading-list-topics-footer-container">
          <div className="user-information">
            <div className="username">{sessionUser.username}</div>
            <div className="list-length">
              {readingListDisplay(readingListAll, readingList)}
            </div>
          </div>
          <div className="heading-div">
            <h1>Reading List</h1>
          </div>
          {readingListAll && readingListAll[0]?.article && (
            <>
              <div className="reading-list-container">
                {readingListAll.map(({ article }) => (
                  <div key={article.id} className="full-article-div">
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
                      <ReadingListRemoveButtonComponent
                        props={[article.id, userId]}
                      />
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
      )}
    </>
  );
};

export default ReadingListComponent
