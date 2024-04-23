// import ProfileButton from "./ProfileButton.tsx";
import LoginFormModal from "../LoginFormModal/index.tsx";
import OpenModalButton from "../OpenModalButton/index.tsx";
import SignupFormModal from "../SignupFormModal/index.tsx";
import { logout } from "../../store/session.ts";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, StateType } from "../../typeDeclerations.ts";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import "./Navigation.css";
import React from "react";

function Navigation({ isLoaded }: { isLoaded: boolean }) {
  const nav = useNavigate();
  const sessionUser = useSelector((state: StateType) => state.session?.user);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef<HTMLDivElement>(null);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

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

  const closeMenu = () => setShowMenu(false);

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  const readingListRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    nav(`/${sessionUser.id}/reading-list`);
  };

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logout())
    nav("/");
  };


  return (
    <>
      {sessionUser ? (
        <>
          <div className="nav-div-user-logged-in">
            <div className="nav-icon-user-logged-in">
              <Link to="/">
                <img
                  className="logo-on-nav"
                  src="/icons/rsz_logo.png"
                  alt="honcomb with the word overload"
                />
              </Link>
            </div>
            <div className="nav-blank-user-logged-in"></div>
            <div className="profile-create-user-logged-in">
              <div className="nav-create-user-logged-in">
                <Link to="/new-article">Create</Link>
              </div>
              <div className={ulClassName} ref={ulRef}></div>
              {isLoaded && (
                <div className="profile-button-user-logged-in">
                  <button onClick={readingListRedirect} className="reading-list-button">Reading List</button>
                  <button
                    onClick={handleLogout}
                    className="drop-down-sign-out"
                  >Logout</button>
                </div>
              )}
            </div>
          </div>
          <span className="divider"></span>
        </>
      ) : (
        <>
          <div className="nav-div">
            <div className="nav-icon">
              <Link to="/">
                <img
                  className="logo-on-nav"
                  src="/icons/rsz_logo.png"
                  alt="honcomb with the word overload"
                />
              </Link>
            </div>
            <div className="nav-blank"></div>
            <div className="rest-of-nav">
              <div className="nav-my-story">
                <Link to="/my-story">My Story</Link>
              </div>
              <div className="nav-create">
                <Link to="/create">Learn</Link>
              </div>

              <div className={ulClassName} ref={ulRef}></div>

              <div className="nav-login">
                <OpenModalButton
                  buttonText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div className="nav-sign-up">
                <OpenModalButton
                  buttonText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default React.memo(Navigation);
