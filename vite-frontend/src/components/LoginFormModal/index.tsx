import { login } from "../../store/session";
import { useModal } from "../../../context/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { LoginErrorsType, AppDispatch } from "../../typeDeclerations.ts";
import "./LoginForm.css";



function LoginFormModal() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<LoginErrorsType>({ email: null, password: null });
  const { closeModal } = useModal();

  // Handling form submission
  const handleSubmit = async (e: FormEvent) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(email) === false) {
      setErrors({email: 'Please enter a valid email', password: null});
    }
    if (password.length < 8) {
      setErrors({email: null, password: 'Password must be at least 8 characters long'});
    }
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data); // Setting errors if login is unsuccessful
    } else {
      closeModal(); // Closing modal if login is successful
    }
  };

  // Logging in as a demo user
  const loginDemo = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password")).then(closeModal);
    nav("/"); // Navigating to the home page after logging in as a demo user
  };

  // Determining the CSS class for displaying errors
  const errorsClass = errors.email || errors.password ? "email-login-errors" : "";

  // Rendering the login form
  return (
    <>
      <div className="login-form-container">
        <h2>Welcome back.</h2>
        <form onSubmit={handleSubmit}>
          <div className="email-and-password-container">
            <div className="email-div-for-login">
              <label>Email</label>
              <input
                className={errorsClass}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="password-for-login">
              <label>Password</label>
              <input
                className={errorsClass}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errors.password || errors.email ? (
              <div className="" >Invalid Email and password combination </div>
            ) : (
              <></>
            )}
          </div>
          <button className="login-form-submit-button" type="submit">
            Log In
          </button>
          <button className="login-form-submit-button" onClick={loginDemo}>
            Log In as Demo User
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
