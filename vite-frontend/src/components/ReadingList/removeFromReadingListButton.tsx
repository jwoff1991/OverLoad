import { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../typeDeclerations";
import { removeFromReadingList } from "../../store/readingList";


type ReadingListRemoveButtonProps = {
  articleId: number;
  userId: string;
};


const ReadingListRemoveButtonComponent = (props: ReadingListRemoveButtonProps) => {
  let articleId = props.articleId;
  let userId = parseInt(props.userId);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  // const [rerenderFlag, setRerenderFlag] = useState(false);
  // console.log(rerenderFlag)

  const removeFromList = (e: FormEvent) => {
    e.preventDefault();
    dispatch(removeFromReadingList(articleId, userId));
    // setRerenderFlag((prevFlag: boolean) => !prevFlag); // Toggle the flag to trigger a rerender
    return;
  };

  // useEffect(() => {
  //   console.log("rerendering");
  // }, [rerenderFlag]);



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
