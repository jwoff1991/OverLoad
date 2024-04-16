import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../typeDeclerations";
import { getUserReadingList, removeFromReadingList } from "../../store/readingList";

type ReadingListRemoveButtonProps = {
  articleId: number;
  userId: number;
};

const ReadingListRemoveButtonComponent = (props: ReadingListRemoveButtonProps) => {
  let articleId = props.articleId;
  let userId = props.userId;
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const removeFromList = (e: FormEvent) => {
    e.preventDefault();
    dispatch(removeFromReadingList(articleId, userId));
    dispatch(getUserReadingList())
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
