import { useDispatch } from "react-redux";
import { addToReadingList } from "../../store/readingList";
import { FormEvent } from "react";
import { AppDispatch } from "../../typeDeclerations";


type ReadingListAddButtonProps = [number, number];



const ReadingListAddButtonComponent = (props: ReadingListAddButtonProps) => {
  let articleId = props[0];
  let userId = props[1];
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const addToList = (e: FormEvent) => {
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
