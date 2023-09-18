import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();


    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


    if(regex.test(email) === false) {
      setErrors({'email': 'This is not a valid email'})
    } else {
      if (password === confirmPassword) {
        const data = await dispatch(signUp(firstname, lastname, username, email, bio, password));
        if (data) {
          setErrors(data);
        } else {
          closeModal();
        }
      } else if (password.length < 8 ) {
        setErrors({password: "Password should be at least 8 characters"})
      } else {
        setErrors({
          password:
            "Confirm Password field must be the same as the Password field",
        });
      }
    }


	};
  let isDisabled = true;
  console.log(password)
  if(password.length >= 8) {
    isDisabled = false
  }


	const emailErrorsClass = errors.email ? "email-login-errors" : "";
  const firstNameErrorsClass = errors.firstname ? "email-login-errors" : "";
  const lastNameErrorsClass = errors.lastname ? "email-login-errors" : "";
  const userNameErrorsClass = errors.username ? "email-login-errors" : "";
  const passwordErrorsClass = errors.password ? "email-login-errors" : "";

	return (
    <>
      <div className="sign-up-form-container">
        <h3>Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-fields-signup-form">
            <div className="sign-up-form-email">
              <label>Email</label>
              <input
                className={emailErrorsClass}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="sign-up--form-firstname">
              <label>First Name</label>
              <input
                className={firstNameErrorsClass}
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="sign-up--form-lastname">
              <label>Lastname</label>
              <input
                className={lastNameErrorsClass}
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="sign-up--form-username">
              <label>Username</label>
              <input
                className={userNameErrorsClass}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="sign-up--form-bio">
              <label>Bio</label>
              <textarea
                className="bio-textarea-field"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>
            <div className="sign-up--form-password">
              <label>Password</label>
              <input
                className={passwordErrorsClass}
                placeholder="min 8 characters"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="sign-up--form-confirm-password">
              <label>Confirm Password</label>
              <input
                className={passwordErrorsClass}
                placeholder="min 8 characters"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" disabled={isDisabled} className="signup-button-submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
