import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSideBar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <AdminSidebar />

      <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}
