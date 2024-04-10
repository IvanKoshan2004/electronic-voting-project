import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import css from "./LoginAndRegisterPage.module.css";
export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = async e => {
    e.preventDefault();
    const user = await login({ username, password });
    setIsSuccess(user.data.success);
    if (user.data.success) {
      navigate("/app");
    }
  };
  return (
    <div className={css.mainContainer}>
      <div className={css.formBlock}>
        <h1>authorization</h1>
        <form onSubmit={handleSubmit}>
          <input value={username} placeholder="username" onChange={e => setUsername(e.target.value)} type="text" />
          <input value={password} placeholder="password" onChange={e => setPassword(e.target.value)} type="password" />
          <div className={css.matchMessage}>{!isSuccess && "Wrong username or password"}</div>
          <input type="submit" className={css.submitBtn} value={"Sign in"} />
        </form>
        <Link to="/auth/register">Sign up</Link>
      </div>
    </div>
  );
}
