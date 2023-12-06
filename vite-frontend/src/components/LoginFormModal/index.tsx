import { FormEvent, useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import store from '../../store/index.ts';
import "./LoginForm.css";

type AppDispatch = ThunkDispatch<typeof store, unknown, AnyAction>

type ErrorsType = {
  email: string | null;
  password: string | null;
}
;

function LoginFormModal() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<ErrorsType>({email: null, password: null});
  const { closeModal } = useModal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const loginDemo = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login("demo@aa.io", "password")).then(closeModal);
    nav("/");
  };

  const errorsClass =
    errors.email || errors.password ? "email-login-errors" : "";
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