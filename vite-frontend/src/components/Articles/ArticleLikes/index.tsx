import { FormEvent } from "react";
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


  let likesLength;
  if (likes && likes.length) {
    likesLength = likes.length;
  }

  let userIdFromLikes: number[] = [];
  let articleLikes: { user_id: number }[];


  const userIdsInLikesList = (articleLikes: { user_id: number }[]) => {
    articleLikes.map(({ user_id }) => {
      userIdFromLikes.push(user_id);
    });
  };

  if (likes && likes.length) {
    articleLikes = Object.values(likes);
    userIdsInLikesList(articleLikes);
  }

 

  const removeUserLike = (e: FormEvent) => {
    e.preventDefault();
    dispatch(removeLike(articleId, sessionUser.id));
  };

  const addUserLike = (e: FormEvent) => {
    console.log('button clicked')
    e.preventDefault();
    dispatch(addLike(articleId, sessionUser.id));
  };

  const userNotLoggedInLikeButton = (e:FormEvent) => {
    e.preventDefault();
    alert('You must be logged in to like an article')
  }

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
