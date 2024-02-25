import OpenModal from "../../OpenModalButton";
import EditCommentModal from "../UpdateComment";
import DeleteCommentModal from "../DeleteCommentModal";
import { UserType } from "../../../typeDeclerations";
import { useState, useEffect, useRef } from "react";
import './editDeleteButton.css'

type EditDeleteButtonProps = {
  props: [id: number, body: string, sessionUser: UserType];
}

function EditDeleteButton(props: EditDeleteButtonProps) {
  const [id, body, sessionUser] = props.props
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e: MouseEvent) => {
      if (ulRef.current && !ulRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);



  const ulClassName = "edit-delete-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu}>
        <img src='icons/dot_7080735.png' alt='elipsis' />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        (
          <>
            <OpenModal
              buttonText="Edit Comment"
              onItemClick={closeMenu}
              modalComponent={
                <EditCommentModal props={[id, body, sessionUser]} />
              }
              className="article-delete-button"
            />
            <OpenModal
              buttonText="Delete"
              onItemClick={closeMenu}
              modalComponent={<DeleteCommentModal props={id} />}
              className="article-delete-button"
            />
          </>
        )
      </ul>
    </>
  );
}

export default EditDeleteButton;
