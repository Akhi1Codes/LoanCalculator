// layouts/MainLayout.tsx
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>
    </>
  );
}
