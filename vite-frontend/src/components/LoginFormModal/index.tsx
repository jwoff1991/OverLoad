import { login } from "../../store/session";
import { useModal } from "../../context/Modal.tsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { AppDispatch } from "../../typeDeclerations.ts";
import "./LoginForm.css";
import { ErrorMessages } from "../errorMessages.tsx";

function LoginFormModal() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { closeModal } = useModal();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;


    if (!regex.test(email) || password.length < 8) {
      setError('Invalid Email and password combination');
      return;
    }


    const data = await dispatch(login(email, password));
    if (data) {
      setError('Invalid Email and password combination'); // Setting error if login is unsuccessful
    } else {
      closeModal(); // Closing modal if login is successful
      nav("/"); // Navigating to the home page
    }
  };

  // Logging in as a demo user
  const loginDemo = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    closeModal();
    nav("/"); // Navigating to the home page after logging in as a demo user
  };

  const emailErrorsClass = error?.length ? "email-login-errors" : ""

  return (
    <>
      <div className="login-form-container">
        <h2>Welcome back.</h2>
        <form onSubmit={handleSubmit}>
          <div className="email-and-password-container">
            <div className="email-div-for-login">
              <label>Email</label>
              <input
                type="text"
                className={emailErrorsClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="password-for-login">
              <label>Password</label>
              <input
                type="password"
                className={emailErrorsClass}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
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
