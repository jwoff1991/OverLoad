import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/index.tsx";
import ProfileButton from "./ProfileButton.tsx";
import LoginFormModal from "../LoginFormModal/index.tsx";
import SignupFormModal from "../SignupFormModal/index.tsx";
import "./Navigation.css";
import { StateType } from "../../typeDeclerations.ts";


function Navigation({ isLoaded }: { isLoaded: boolean }) {
  const sessionUser = useSelector((state: StateType) => state.session?.user);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef<HTMLDivElement>(null);



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
  // const openMenu = () => {
  //   if (showMenu) return;
  //   setShowMenu(true);
  // };
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {sessionUser ? (
        <>
          <div className="nav-div-user-logged-in">
            <div className="nav-icon-user-logged-in">
              <Link to="/">
              <img className='logo-on-nav' src='/icons/rsz_logo.png' alt='honcomb with the word overload' />
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
                  <ProfileButton user={sessionUser} />
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
              <img className='logo-on-nav'src='/icons/rsz_logo.png' alt='honcomb with the word overload' />
              </Link>
            </div>
            <div className="nav-blank"></div>
            <div className="rest-of-nav">
              <div className="nav-my-story">
                <Link to='/my-story'>My Story</Link>
              </div>
              <div className="nav-create">
                <Link to='/create'>Learn</Link>
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

export default Navigation;
