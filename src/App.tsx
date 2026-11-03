import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import PortfolioPage from "./features/portfolio/PortfolioPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-5 py-12">
            <div
              className="bg-grid pointer-events-none absolute inset-0"
              aria-hidden="true"
            />
            <div className="relative w-full max-w-md"></div>
          </main>
        }
      />
    </Routes>
  );
}
