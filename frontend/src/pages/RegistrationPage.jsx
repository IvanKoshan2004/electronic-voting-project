import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";
import { register } from "../api/auth";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { checkAuth } = useContext(AuthContext);
  const handleSubmit = async e => {
    e.preventDefault();
    await register({ username, password });
    const isAuth = checkAuth(Cookies.get("user"));
    if (isAuth) {
      navigate("/app");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/auth/login")}>Sign in</button>
    </div>
  );
}
