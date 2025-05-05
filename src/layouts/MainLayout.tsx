// layouts/MainLayout.tsx
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

interface Props {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export default function MainLayout({ toggleTheme, mode }: Props) {
  return (
    <>
      <Navbar toggleTheme={toggleTheme} mode={mode} />
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>
    </>
  );
}
