import { useDispatch, useSelector } from "react-redux";
import { getUserReadingList, removeFromReadingList } from "../../store/readingList";


const ReadingListRemoveButtonComponent = (props) => {
  let articleId = props.props[0];
  let userId = props.props[1];
  const dispatch = useDispatch();

  const removeFromList = (e) => {
    e.preventDefault();
    dispatch(removeFromReadingList(articleId, userId));
    // dispatch(getUserReadingList(userId))
    return;
  };
  return (
    <>
      <button className="reading-list-button" onClick={removeFromList}>
        <img
          className="bookmark-icon"
          src="/icons/bookmark-black-shape_25353.png"
          alt="black bookmark"
        />
      </button>
    </>
  );
};

export default ReadingListRemoveButtonComponent;
