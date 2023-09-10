import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const errorsClass = errors.email || errors.password ? "email-login-errors" : ''

  return (
    <>
      <div className="login-form-container">
        <h2>Welcome back.</h2>
        <form onSubmit={handleSubmit}>
          <div className="email-and-password-container">
          <div className="email-div-for-login">
            <label>
              Email
            </label>
              <input
              className={errorsClass}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>
          <div className="password-for-login">
            <label>
              Password
              </label>
              <input
                className={errorsClass}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
          </div>

          </div>
          <button className='login-form-submit-button'type="submit">Log In</button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
