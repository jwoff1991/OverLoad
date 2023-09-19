import { useDispatch } from "react-redux";
import { removeLike, addLike } from "../../../store/likes";
import './articlelikes.css'

const ArticleLikes = (sessionUser, likes, articleId) => {
  const dispatch = useDispatch();

  //gets like length
  let likesLength;
  if (likes && likes.length) {
    likesLength = likes.length;
  }

  //get userId from likes list
  let userIdFromLikes = [];
  let articleLikes;

  const userIdsInLikesList = (articleLikes) => {
    articleLikes.map(({ user_id }) => {
      userIdFromLikes.push(user_id);
    });
  };

  if (likes && likes.length) {
    articleLikes = Object.values(likes);
    userIdsInLikesList(articleLikes);
  }
  const removeUserLike = (e) => {
    e.preventDefault();
    dispatch(removeLike(articleId, sessionUser.id));
  };

  const addUserLike = (e) => {
    e.preventDefault();
    dispatch(addLike(articleId, sessionUser.id));
  };

  //renders clear like button if user is not inclued in article likes list
  const likeButtonClear = (
    <button onClick={addUserLike}>
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
  );

  //renders black like button if user is inclued in article likes list
  const likeButtonBlack = (
    <button onClick={removeUserLike}>
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
    if (userIdFromLikes.includes(sessionUser.id)) {
      return likeButtonBlack;
    } else {
      return likeButtonClear;
    }
  };

  return <>{likeButton()}</>;
};

export default ArticleLikes;
