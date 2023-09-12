import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import ProfileButton from "./ProfileButton";
import { logout } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {sessionUser ? (
        <>
          <div className="nav-div-user-logged-in">
            <div className="nav-icon-user-logged-in">
              <NavLink exact to="/">
                Icon
              </NavLink>
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
              <NavLink exact to="/">
                Icon
              </NavLink>
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
