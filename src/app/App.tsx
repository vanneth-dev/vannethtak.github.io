import { Route, Routes } from "react-router-dom";
import Login from "@/features/auth/pages/Login";
import HomePage from "@/features/portfolio/pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
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
