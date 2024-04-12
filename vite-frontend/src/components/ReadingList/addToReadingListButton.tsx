import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../typeDeclerations";
import { addToReadingList, getUserReadingList } from "../../store/readingList";

type ReadingListAddButtonProps = {
  articleId: number;
  userId: number
};

const ReadingListAddButtonComponent = (props: ReadingListAddButtonProps) => {
  let articleId = props.articleId;
  let userId = props.userId;
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const addToList = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addToReadingList(articleId, userId));
    dispatch(getUserReadingList())
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
