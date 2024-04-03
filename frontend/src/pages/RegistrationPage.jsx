import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import css from "./LoginAndRegisterPage.module.css";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    await register({ username, password });
  };
  return (
    <div className={css.mainContainer}>
      <div className={css.formBlock}>
        <h1>REGISTRATION</h1>
        <form onSubmit={handleSubmit}>
          <input value={username} placeholder="username" onChange={e => setUsername(e.target.value)} type="text" />
          <input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} type="password" />
          <input
            value={matchPassword}
            placeholder="confirm password"
            onChange={e => setMatchPassword(e.target.value)}
            type="password"
          />
          <button type="submit" className={css.submitBtn}>
            Sign up
          </button>
        </form>
        <a onClick={() => navigate("/auth/login")}>Sign in</a>
      </div>
    </div>
  );
}
