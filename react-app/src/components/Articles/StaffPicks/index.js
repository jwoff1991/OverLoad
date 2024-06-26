import React from "react";
import { useSelector } from "react-redux";
import './staffpicks.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


const StaffPicks = () => {
  const articles = useSelector((state) => state.articles.allArticles);

  const article1 = articles[0]
  const article2 = articles[1]
  const article3 = articles[2]
  const article4 = articles[3]
  const article5 = articles[4]

  const articleDateConverter = (date) => {
    let createdAtSplit = date?.split("").slice(5, 11).join("");
    return createdAtSplit;
  };

  // Now you can use article1, article2, article3, article4, and article5 in your component


  return (
    <>
      <div className="staff-picks-container">
        <h4>Staff Picks</h4>
        <div className="staff-picks-article-div">
        <NavLink key={article1?.id} to={`/articles/${article1?.id}`} className='text-link'>
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
          </NavLink>
        </div>
        <div className="staff-picks-article-div">
        <NavLink key={article2?.id} to={`/articles/${article2?.id}`} className='text-link'>
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
          </NavLink>
        </div>
        <div className="staff-picks-article-div">
        <NavLink key={article3?.id} to={`/articles/${article3?.id}`} className='text-link'>
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
          </NavLink>
        </div>
        <div className="staff-picks-article-div">
        <NavLink key={article4?.id} to={`/articles/${article4?.id}`} className='text-link'>
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
          </NavLink>
        </div>
        <div className="staff-picks-article-div">
        <NavLink key={article5?.id} to={`/articles/${article5?.id}`} className='text-link'>
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
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default StaffPicks;
