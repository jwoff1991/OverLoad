import { useDispatch } from "react-redux";
import { addToReadingList } from "../../store/readingList";



const ReadingListAddButtonComponent = (props) => {
  let articleId = props.props[0];
  let userId = props.props[1];
  const dispatch = useDispatch();

  const addToList = (e) => {
    e.preventDefault();
    dispatch(addToReadingList(articleId, userId));
    // dispatch(getUserReadingList(userId))
    return;
  };
  return (
    <>
      <button className="reading-list-button" onClick={addToList}>
        <img
          className="bookmark-icon"
          src="/icons/bookmark_10330015.png"
          alt="clear bookmark"
        />
      </button>
    </>
  );
};

export default ReadingListAddButtonComponent;
