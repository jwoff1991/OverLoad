import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	return (
    <>
      <div>
        <NavLink exact to="/">
          Home
        </NavLink>
      </div>
		<Link to='/new-article'>Create</Link>
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </>
  );
}

export default Navigation;
