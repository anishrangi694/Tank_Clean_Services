import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminSideBar from "./components/AdminSideBar";

import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./Pages/AdminHome";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRequests from "./Pages/AdminRequests";

function App() {
  // Controls the mobile / tablet slide-in sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close the drawer whenever the route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the drawer is open (mobile only matters)
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Shared layout: sidebar (drawer on small screens) + scrollable content
  const withLayout = (page) => (
    <ProtectedRoute>
      <AdminSideBar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="min-h-screen bg-gray-50 pt-16 md:pt-[90px] lg:pl-64">
        {page}
      </main>
    </ProtectedRoute>
  );

  return (
    <>
      {/* Navbar is always visible */}
      <Navbar
        sidebarOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen((prev) => !prev)}
      />

      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        <Route path="/" element={withLayout(<AdminHome />)} />

        <Route path="/requests" element={withLayout(<AdminRequests />)} />

        {/* Wrong URL */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;