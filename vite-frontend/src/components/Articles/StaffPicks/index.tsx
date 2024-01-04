import { useSelector } from "react-redux";
import './staffpicks.css'
import { Link } from "react-router-dom";

type UserType = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  bio: string;
}
type ArticleType = {
  id: number;
  title: string;
  body: string;
  author: UserType;
  date_created: string;
}
type StateType = {
  articles: {
    allArticles: ArticleType[];
  };
}


const StaffPicks = () => {
  const articles: ArticleType[] = useSelector((state: StateType) => state.articles.allArticles);
  let article1 = articles[5];
  let article2 = articles[14];
  let article3 = articles[20];
  let article4 = articles[1];
  let article5 = articles[7];

  const articleDateConverter = (date: String) => {
    let createdAtSplit = date?.split("").slice(5, 11).join("");
    return createdAtSplit;
  };

  return (
    <>
      <div className="staff-picks-container">
        <h4>Staff Picks</h4>
        <div className="staff-picks-article-div">
        <Link key={article1?.id} to={`/articles/${article1?.id}`} className='text-link'>
          <div className="date-author-staff-div">
            <div className="staff-date-article-author">
              <div className="staff-author">
                {article1?.author.firstname} {article1?.author.lastname}
              </div>
              <span>&#183;</span>
              <div className="staff-date-created">
                {articleDateConverter(article1?.date_created)}
              </div>
            </div>
          </div>
          <div className="staff-article-title">{article1?.title}</div>
          </Link>
        </div>
        <div className="staff-picks-article-div">
        <Link key={article2?.id} to={`/articles/${article2?.id}`} className='text-link'>
          <div className="date-author-staff-div">
            <div className="staff-date-article-author">
              <div className="staff-author">
                {article2?.author.firstname} {article2?.author.lastname}
              </div>
              <span>&#183;</span>
              <div className="staff-date-created">
                {articleDateConverter(article2?.date_created)}
              </div>
            </div>
          </div>
          <div className="staff-article-title">{article2?.title}</div>
          </Link>
        </div>
        <div className="staff-picks-article-div">
        <Link key={article3?.id} to={`/articles/${article3?.id}`} className='text-link'>
          <div className="date-author-staff-div">
            <div className="staff-date-article-author">
              <div className="staff-author">
                {article3?.author.firstname} {article3?.author.lastname}
              </div>
              <span>&#183;</span>
              <div className="staff-date-created">
                {articleDateConverter(article3?.date_created)}
              </div>
            </div>
          </div>
          <div className="staff-article-title">{article3?.title}</div>
          </Link>
        </div>
        <div className="staff-picks-article-div">
        <Link key={article4?.id} to={`/articles/${article4?.id}`} className='text-link'>
          <div className="date-author-staff-div">
            <div className="staff-date-article-author">
              <div className="staff-author">
                {article4?.author.firstname} {article4?.author.lastname}
              </div>
              <span>&#183;</span>
              <div className="staff-date-created">
                {articleDateConverter(article4?.date_created)}
              </div>
            </div>
          </div>
          <div className="staff-article-title">{article4?.title}</div>
          </Link>
        </div>
        <div className="staff-picks-article-div">
        <Link key={article5?.id} to={`/articles/${article5?.id}`} className='text-link'>
          <div className="date-author-staff-div">
            <div className="staff-date-article-author">
              <div className="staff-author">
                {article5?.author.firstname} {article5?.author.lastname}
              </div>
              <span>&#183;</span>
              <div className="staff-date-created">
                {articleDateConverter(article5?.date_created)}
              </div>
            </div>
          </div>
          <div className="staff-article-title">{article5?.title}</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default StaffPicks;
