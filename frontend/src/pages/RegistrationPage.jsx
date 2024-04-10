import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import css from "./LoginAndRegisterPage.module.css";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const isMatched = password === matchPassword;
  const handleSubmit = async e => {
    e.preventDefault();
    if (password !== matchPassword) {
      return;
    }
    try {
      const { data } = await register({ username, password });
      navigate("/app");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={css.mainContainer}>
      <div className={css.formBlock}>
        <h1>registration</h1>
        <form onSubmit={handleSubmit}>
          <input value={username} placeholder="username" onChange={e => setUsername(e.target.value)} type="text" />
          <input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} type="password" />
          <input
            value={matchPassword}
            placeholder="confirm password"
            onChange={e => setMatchPassword(e.target.value)}
            type="password"
          />
          <div className={css.matchMessage}>{!isMatched && "Passwords do not match. Try again"}</div>
          <button type="submit" className={css.submitBtn}>
            Sign up
          </button>
        </form>
        <Link to="/auth/login">Sign in</Link>
      </div>
    </div>
  );
}
