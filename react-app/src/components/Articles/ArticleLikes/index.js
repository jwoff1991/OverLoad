import { useDispatch } from "react-redux";
import { removeLike, addLike } from "../../../store/likes";
import './articlelikes.css'

const ArticleLikes = (sessionUser, likes, articleId) => {
  const dispatch = useDispatch();

  const articleLikes = likes ? Object.values(likes) : [];
  const userIdFromLikes = articleLikes.map(({ user_id }) => user_id);

  const removeUserLike = (e) => {
    e.preventDefault();
    dispatch(removeLike(articleId, sessionUser.id));
  };

  const addUserLike = (e) => {
    e.preventDefault();
    dispatch(addLike(articleId, sessionUser.id));
  };

  //renders clickable like button if user is logged in and not on likeList, or renders unclickable like button if user is not logged in
  const likeButtonClear = (
    <>
      {sessionUser ? (
        <button onClick={addUserLike} /*disabled={buttonDisabled} */>
          <div className="likes-icon-and-number-container">
            <div className="likes-icon-container">
              <img
                className="likes-icon"
                src="/icons/likeclear.png"
                alt="like icon"
              />
            </div>
            <div className="likes-number-container">
              {likes && likes.length ? likes.length : 0}
            </div>
          </div>
        </button>
      ) : (
        <button>
          <div className="likes-icon-and-number-container">
            <div className="likes-icon-container">
              <img
                className="likes-icon"
                src="/icons/likeclear.png"
                alt="like icon"
              />
            </div>
            <div className="likes-number-container">
              {likes && likes.length ? likes.length : 0}
            </div>
          </div>
        </button>
      )}
    </>
  );

  //renders black like button if user is inclued in article likes list
  const likeButtonBlack = (
    <button onClick={removeUserLike} /*disabled={buttonDisabled} */>
      <div className="likes-icon-and-number-container">
        <div className="likes-icon-container">
          <img className="likes-icon" src="/icons/like.png" alt="like icon" />
        </div>
        <div className="likes-number-container">
          {likes && likes.length ? likes.length : 0}
        </div>
      </div>
    </button>
  );

  //choses which button to display based on if user is in artile like list or not
  const likeButton = () => {
    if (sessionUser && userIdFromLikes.includes(sessionUser.id)) {
      return likeButtonBlack;
    } else {
      return likeButtonClear;
    }
  };

  return <>{likeButton()}</>;
};

export default ArticleLikes;
