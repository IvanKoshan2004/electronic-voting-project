import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/auth/register")}>Sign up</button>
    </div>
  );
}
