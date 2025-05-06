import { BrowserRouter as Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import ExchangeRates from "../pages/ExchangeRates";
import ErrorPage from "../pages/ErrorPage";

export default function AppRoutes() {
  return (
    <Routes basename="/LoanCalculator">
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/exchangerate" element={<ExchangeRates />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
