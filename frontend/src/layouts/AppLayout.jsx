import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      App layout
      <Outlet />
    </div>
  );
}
