import { ProptectedRoute } from "./components/ProptectedRoute";

import ChangePassword from "./pages/ChangePassword";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProptectedRoute>
            <Home />
          </ProptectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/changePassword" element={<ChangePassword />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
