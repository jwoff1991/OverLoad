import { logout } from "../../store/session.ts";
import { UserType } from "../../typeDeclerations.ts";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Navigation.css";


function ProfileButton({ user }: { user: UserType }) {
  const nav = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const ulRef = useRef<HTMLUListElement>(null);

  const openMenu = () => {
    if (showUserMenu) return;
    setShowUserMenu(true);
  };


  useEffect(() => {
    if (!showUserMenu) return;

    const closeMenu = (e: MouseEvent) => {
      if (ulRef.current && !ulRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showUserMenu]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    logout();
    nav("/");
  };

  const ulClassName = "profile-dropdown" + (showUserMenu ? "" : " hidden");
  const closeMenu = () => setShowUserMenu(false);

  const readingListRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeMenu();
    nav(`/${user.id}/reading-list`);
  };

  const userProfileRedirect = () => {
    closeMenu();
    nav("/userprofile"); 
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
              <button onClick={userProfileRedirect}>User Profile</button>
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
