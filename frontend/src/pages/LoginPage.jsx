import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import css from "./LoginAndRegisterPage.module.css";
export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    await login({ username, password });
    navigate("/app");
  };

  return (
    <div className={css.mainContainer}>
      <div className={css.formBlock}>
        <h1>AUTHORIZATION</h1>
        <form onSubmit={handleSubmit}>
          <input value={username} placeholder="username" onChange={e => setUsername(e.target.value)} type="text" />
          <input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} type="password" />
          <button type="submit" className={css.submitBtn}>
            Sign in
          </button>
        </form>
        <a onClick={() => navigate("/auth/register")}>Sign up</a>
      </div>
    </div>
  );
}
