import { signUp } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { AppDispatch, ErrorsType } from '../../typeDeclerations';
import { FormEvent, useState } from "react";
import { validateField } from "../../helperFunctions";
import { ErrorMessages } from "../../helperComponents";
import "./SignupForm.css";


function SignupFormModal() {
  const dispatch: AppDispatch = useDispatch<AppDispatch>();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ErrorsType>({
    password: null,
    firstname: null,
    lastname: null,
    username: null,
    bio: null,
    email: null,
  });
  const { closeModal } = useModal();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    let newErrors: ErrorsType = {
      password: null,
      firstname: null,
      lastname: null,
      username: null,
      bio: null,
      email: null,
    };

    newErrors.email = !regex.test(email) ? "Please enter a valid email" : null;
    newErrors.password =
      password.length < 8 ? "Password should be at least 8 characters" : null;
    newErrors.password =
      password !== confirmPassword
        ? "Confirm Password field must be the same as the Password field"
        : newErrors.password;
    newErrors.firstname = validateField(firstname, "First name is required");
    newErrors.lastname = validateField(lastname, "Last name is required");
    newErrors.username = validateField(username, "Username is required");

    setErrors(newErrors);

    // If there are no errors, proceed with the sign-up process
    if (!newErrors.email && !newErrors.password) {
      const data = await dispatch(
        signUp(firstname, lastname, username, email, bio, password)
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    }
  };

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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </div>
            <div className="sign-up--form-password">
              <label>Password</label>
              <input
                className={passwordErrorsClass}
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
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="error-validation-div">
              <ErrorMessages errors={errors} />
            </div>
          </div>
          <button type="submit" className="signup-button-submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
