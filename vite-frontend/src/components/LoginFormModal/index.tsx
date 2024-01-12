import { FormEvent, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import store from '../../store/index.ts'; // Importing the Redux store
import "./LoginForm.css";

// Defining types for dispatch and error handling
type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>
type ErrorsType = {
  email: string | null;
  password: string | null;
};

// Main component for the login form
function LoginFormModal() {
  // Initializing Redux dispatch, navigation, state variables, and modal context
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorsType>({ email: null, password: null });
  const { closeModal } = useModal();

  // Handling form submission
  const handleSubmit = async (e: FormEvent) => {
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
            {errors.password ? (
              <div>Email and password combination are incorrect</div>
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
