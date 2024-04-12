import SpinnerLoadingScreen from "../LoadingScreen";
import ReadingListRemoveButtonComponent from "./removeFromReadingListButton";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUserReadingList } from "../../store/readingList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType, AppDispatch, ArticleType } from "../../typeDeclerations";
import "./readingListComponent.css";
import { articleBodyConverter, articleDateConverter } from "../../helperFunctions";


type ReadingListType = {
  article: ArticleType;
  article_id: number;
  id: number;
  user_id: number;
}

type ReadingListAllType = ReadingListType[]


const ReadingListComponent = () => {
  const userId = useParams().userid;
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const readingList = useSelector((state: StateType) => state.readingList);
  const sessionUser = useSelector((state: StateType) => state.session.user);
  const readingListAll: ReadingListAllType = Object.values(readingList);

  useEffect(() => {
    dispatch(getUserReadingList());
  }, [dispatch, userId, sessionUser]);


  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

// Gets the count of all articles in the user reading list and displays it
const readingListDisplay = (readingListAll: ReadingListType[]) => {
  const articleCount = readingListAll?.length || 0;
  return <>{articleCount} Article{articleCount === 1 ? '' : 's'}</>;
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
              {readingListDisplay(readingListAll)}
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
                        articleId={article.id} userId={parseInt(userId!)}
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
