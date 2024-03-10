import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main>
      <p>Auth Layout</p>
      <Outlet />
    </main>
  );
}
