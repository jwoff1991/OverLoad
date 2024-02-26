import SpinnerLoadingScreen from "../LoadingScreen";
import ReadingListRemoveButtonComponent from "./removeFromReadingListButton";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getUserReadingList } from "../../store/readingList";
import { useEffect, useState } from "react";
import { StateType, AppDispatch, ArticleType } from "../../typeDeclerations";
import { useDispatch, useSelector } from "react-redux";
import "./readingListComponent.css";


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

  //converts article body so no more than 150 chars chows on preview
  const articleBodyConverter = (body: string) => {
    let newArticleBody = body.split("").slice(0, 150).join("");
    return newArticleBody;
  };

  //converts date_created to a more readable format
  const articleDateConverter = (date: string) => {
    let createdAtSplit = date.split("").slice(5, 11).join("");
    return createdAtSplit;
  };

  //gets all article ids in user reading list
  const readingListDisplay = (readingListAll: [], readingList: []) => {
    if (readingListAll && readingListAll.length && readingList[0]) {
      return <>{readingListAll.length} Article(s)</>;
    } else {
      return <>0 Articles</>;
    }
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
