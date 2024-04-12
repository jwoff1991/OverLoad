import { useDispatch } from "react-redux";
import { removeLike, addLike } from "../../../store/likes";
import { AppDispatch, UserType } from "../../../typeDeclerations";
import './articlelikes.css'



const ArticleLikes = (
  sessionUser: UserType,
  likes: ArrayLike<{ user_id: number }>,
  articleId: string
) => {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  interface Like {
    user_id: number;
  }

  // Get userIds from likes list
  const userIdsInLikesList = (articleLikes: Like[]): number[] => {
    return articleLikes.map(({ user_id }) => user_id);
  };

  let userIdFromLikes: number[] = [];
  let articleLikes: Like[] = [];

  if (likes && likes.length) {
    articleLikes = Object.values(likes);
    userIdFromLikes = userIdsInLikesList(articleLikes);
  }

  const removeUserLike = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(removeLike(articleId, sessionUser.id));
  };

  const addUserLike = (e: React.FormEvent) => {
    console.log('button clicked');
    e.preventDefault();
    dispatch(addLike(articleId, sessionUser.id));
  };

  const userNotLoggedInLikeButton = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Please log in to like an article.');
  };


  //renders clickable like button if user is logged in and not on likeList, or renders unclickable like button if user is not logged in
  const likeButtonClear = (
    <>
      {sessionUser ? (
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
      ) : (
        <button onClick={userNotLoggedInLikeButton}>
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
    if (sessionUser && userIdFromLikes.includes(sessionUser.id)) {
      return likeButtonBlack;
    } else {
      return likeButtonClear;
    }
  };

  return <>{likeButton()}</>;
};

export default ArticleLikes;
