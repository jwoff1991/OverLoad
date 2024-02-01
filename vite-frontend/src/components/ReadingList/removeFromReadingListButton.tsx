import { useDispatch } from "react-redux";
import { removeFromReadingList } from "../../store/readingList";
import { AppDispatch } from "../../typeDeclerations";
import { FormEvent } from "react";


type ReadingListRemoveButtonProps = [number, number];


const ReadingListRemoveButtonComponent = (props: ReadingListRemoveButtonProps) => {
  let articleId = props[0];
  let userId = props[1];
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const removeFromList = (e: FormEvent) => {
    e.preventDefault();
    dispatch(removeFromReadingList(articleId, userId));
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
