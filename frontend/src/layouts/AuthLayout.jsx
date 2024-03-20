import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main>
      <p>Goodbye hell</p>
      <Outlet />
    </main>
  );
}
