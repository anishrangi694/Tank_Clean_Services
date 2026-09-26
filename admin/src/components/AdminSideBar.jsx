import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="w-64 min-h-[calc(100vh-90px)] bg-white border-r border-gray-200 shadow-sm">
      
      {/* Sidebar Top */}
      <div className="px-6 py-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white text-lg shadow-sm">
            A
          </div>

          <div>
            <h2 className="text-sm font-bold text-gray-800">
              Admin Panel
            </h2>

            <p className="text-xs text-gray-400 mt-0.5">
              Tank Cleaning Services
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 py-6">
        <p className="px-3 mb-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
          Main Menu
        </p>

        {/* Dashboard */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3.5 rounded-xl
            font-medium transition-all duration-200 mb-2 border
            ${
              isActive
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-white text-gray-600 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
            }`
          }
        >
          Dashboard
        </NavLink>

        {/* Requests */}
        <NavLink
          to="/requests"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3.5 rounded-xl
            font-medium transition-all duration-200 border
            ${
              isActive
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-white text-gray-600 border-gray-300 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200"
            }`
          }
        >
          Requests
        </NavLink>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-5 w-64 px-4">
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-700">
            Admin Access
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Manage services and requests
          </p>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;