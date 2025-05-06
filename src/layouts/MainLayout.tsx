import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ width: "100vw", paddingTop: 50 }}>
        <Outlet />
      </main>
    </>
  );
}
