import { useState } from "react";
import { thunkLogin } from "../../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
      navigate('/')
    }
  };

  return (
    <div className="log-in modalContainer">
      <h1 className="log-in-h1">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            className="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="error">{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            className="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
        <button type="submit">Log In</button>
      <button type='submit' className='demoUser' onClick={() => {
            setEmail('demo@aa.io')
            setPassword('password')
          }}>
            Demo User
          </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
