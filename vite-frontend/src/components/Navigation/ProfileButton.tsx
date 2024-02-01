import { useState, useEffect, useRef } from "react";
import { logout } from "../../store/session.ts";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { UserType } from "../../typeDeclerations.ts";


function ProfileButton({ user }: { user: UserType}) {
  const [showMenu, setShowMenu] = useState(false);
  const nav = useNavigate();
  const ulRef = useRef<HTMLUListElement>(null);

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

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    nav("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  const readingListRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeMenu();
    nav(`/${user.id}/reading-list`);
  };

  return (
    <>
      <button onClick={openMenu} className="user-profile-dropdown-button">
        {user.username}
        <img
          className="profile-dropdwon-down-arrow"
          src="/icons/down-arrow_5343114.png"
          alt="down arrow"
        />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="user-dropdown-menu">
              <button onClick={readingListRedirect}>Reading List</button>
              <button onClick={handleLogout} className="drop-down-sign-out">
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
