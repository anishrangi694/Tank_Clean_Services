import logo from "../../../frontend/src/assets/logo.png";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = ({ onMenuClick, sidebarOpen = false }) => {
  const [admin, setAdmin] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if logged-in user is Admin
  async function checkAdmin() {
    try {
      const response = await fetch(
        "http://localhost:3000/users/profile",
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setAdmin(null);
        return;
      }

      const data = await response.json();

      if (data.data?.role === "Admin") {
        setAdmin(data.data);
      } else {
        setAdmin(null);
      }
    } catch (error) {
      console.log(error);
      setAdmin(null);
    }
  }

  // Check admin whenever route changes
  useEffect(() => {
    checkAdmin();
  }, [location.pathname]);

  // Logout admin
  async function handleLogout() {
    try {
      const response = await fetch(
        "http://localhost:3000/users/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        alert("Logout failed");
        return;
      }

      setAdmin(null);
      setShowProfile(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Logout failed");
    }
  }

  // Close profile when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 md:h-[90px] bg-white border-b border-gray-200 shadow-sm px-3 sm:px-6 flex items-center justify-between gap-2">

      {/* Left: hamburger (mobile/tablet) + logo */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {admin && onMenuClick && (
          <button
            onClick={onMenuClick}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={sidebarOpen}
            className="lg:hidden w-10 h-10 shrink-0 rounded-lg border border-gray-200 text-gray-700 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-6 h-6"
            >
              {sidebarOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        )}

        <img
          src={logo}
          alt="Tank Cleaning Services"
          className="h-12 w-[90px] md:h-[80px] md:w-[120px] object-contain"
        />
      </div>

      {/* Navbar Center (desktop / large tablet) */}
      <div className="hidden md:flex flex-col items-center justify-center text-center">
        <h1 className="text-xl lg:text-3xl font-bold text-orange-500 tracking-tight">
          Admin Dashboard
        </h1>

        <div className="hidden lg:flex items-center gap-2 mt-1">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>

          <p className="text-xs font-medium text-gray-500">
            Manage your tank cleaning services and requests
          </p>
        </div>
      </div>

      {/* Mobile title (shown only when center title is hidden) */}
      <h1 className="md:hidden flex-1 text-center text-base font-bold text-orange-500 truncate">
        Admin
      </h1>

      {/* Admin Profile */}
      {admin ? (
        <div ref={profileRef} className="relative lg:mr-12 shrink-0">
          <button
            onClick={() => setShowProfile(!showProfile)}
            aria-label="Open profile"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-lg md:text-xl hover:bg-orange-600 transition"
          >
            👤
          </button>

          {/* Profile Popup */}
          {showProfile && (
            <div className="absolute right-0 top-12 md:top-14 w-[min(16rem,calc(100vw-1.5rem))] bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">

              {/* Profile Header */}
              <div className="bg-orange-500 px-5 py-4 text-white">
                <p className="text-lg font-semibold break-words">
                  {admin.name}
                </p>

                <p className="text-sm text-orange-100">
                  Administrator
                </p>
              </div>

              {/* Profile Details */}
              <div className="px-5 py-4">
                <p className="text-sm text-gray-500">Email</p>

                <p className="text-sm text-gray-700 font-semibold mb-4 break-all">
                  {admin.email}
                </p>

                <p className="text-sm text-gray-500">Role</p>

                <p className="text-sm text-gray-700 font-semibold mb-5">
                  {admin.role}
                </p>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 rounded-lg border border-red-200 text-red-600 font-semibold hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        // keeps the logo from drifting when no profile is shown
        <div className="md:hidden w-10 shrink-0" />
      )}
    </nav>
  );
};

export default AdminNavbar;