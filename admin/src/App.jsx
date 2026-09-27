import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminSideBar from "./components/AdminSideBar";

import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./Pages/AdminHome";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRequests from "./Pages/AdminRequests";

function App() {
  return (
    <>
      {/* Navbar is always visible */}
      <Navbar />

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<AdminLogin />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div className="h-screen overflow-hidden">

                <AdminSideBar />

                <main className="fixed top-[90px] left-64 right-0 bottom-0 overflow-y-auto bg-gray-50">
                  <AdminHome />
                </main>

              </div>
            </ProtectedRoute>
          }
        />

        {/* Requests */}
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <div className="h-screen overflow-hidden">

                <AdminSideBar />

                <main className="fixed top-[90px] left-64 right-0 bottom-0 overflow-y-auto bg-gray-50">
                  <AdminRequests />
                </main>

              </div>
            </ProtectedRoute>
          }
        />

        {/* Wrong URL */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>
    </>
  );
}

export default App;

