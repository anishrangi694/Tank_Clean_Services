import logo from "../../../frontend/src/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [admin, setAdmin] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  // Check if logged-in user is Admin
  async function checkAdmin() {
    try {
      const response = await fetch("http://localhost:3000/users/profile", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        if (data.data.role === "Admin") {
          setAdmin(data.data);
        } else {
          setAdmin(null);
        }
      } else {
        setAdmin(null);
      }
    } catch (error) {
      setAdmin(null);
    }
  }

  // Logout admin
  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        alert("Logout failed");
        return;
      }

      setAdmin(null);
      setShowProfile(false);

      navigate("/login");
    } catch (error) {
      alert("Logout failed");
    }
  }

  // Check admin when navbar loads
  useEffect(() => {
    checkAdmin();
  }, []);

  // Close profile when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="h-[90px] bg-white border-b border-gray-200 shadow-sm px-6 flex items-center justify-between">
      {/* Logo */}
      <div>
        <img
          src={logo}
          alt="Tank Cleaning Services"
          className="h-[80px] w-[120px] object-contain"
        />
      </div>

      {/* Static Navbar Text */}
      {/* Navbar Center Content */}
      <div className="hidden md:flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-orange-500 tracking-tight">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>

          <p className="text-xs font-medium text-gray-500">
            Manage your tank cleaning services and requests
          </p>
        </div>
      </div>

      {/* Admin Profile */}
      {admin && (
        <div ref={profileRef} className="relative mr-[100px]">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-13 h-13 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl hover:bg-blue-700 transition"
          >
            👤
          </button>

          {/* Profile Popup */}
          {showProfile && (
            <div className="absolute right-0 top-14 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
              {/* Profile Header */}
              <div className="bg-orange-500 px-5 py-4 text-white">
                <p className="text-lg font-semibold">{admin.name}</p>

                <p className="text-sm text-blue-100">Administrator</p>
              </div>

              {/* Profile Details */}
              <div className="px-5 py-4">
                <p className="text-sm text-gray-500">Email</p>

                <p className="text-sm text-gray-700 font-semibold mb-4">{admin.email}</p>

                <p className="text-sm text-gray-400">Role</p>

                <p className="text-sm text-gray-700 font-semibold  mb-5">{admin.role}</p>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-lg border font-semibold border-red-200 text-red-600 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
