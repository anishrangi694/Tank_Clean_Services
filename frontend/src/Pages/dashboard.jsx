import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data.data));

    fetch("http://localhost:3000/requests/my", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setRequests(data.data || []));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Dashboard Header */}
        <div className="mb-8">
          <p className="text-blue-600 font-medium">
            Welcome back 👋
          </p>

          <h1 className="text-3xl font-bold text-slate-800">
            My Dashboard
          </h1>

          
        </div>

        {/* ================= PROFILE ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">

          {/* Profile Header */}
          <div className="bg-blue-50 px-6 py-5 border-b border-blue-100">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl">
                👤
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  My Profile
                </h2>

                <p className="text-sm text-slate-500">
                  Your personal information
                </p>
              </div>

            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">

            <div className="grid sm:grid-cols-3 gap-4">

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">
                  Name
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {user.name || "-"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-semibold text-slate-800 mt-1 break-all">
                  {user.email || "-"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">
                  Contact
                </p>

                <p className="font-semibold text-slate-800 mt-1">
                  {user.mobileNumber || "-"}
                </p>
              </div>

            </div>

          </div>
        </div>


        {/* ================= REQUESTS ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Requests Header */}
          <div className="bg-emerald-50 px-6 py-5 border-b border-emerald-100">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl">
                  📋
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-800">
                    My Requests
                  </h2>

                  <p className="text-sm text-slate-500">
                    Your tank cleaning bookings
                  </p>
                </div>

              </div>

              {/* Request Count */}
              <span className="bg-white text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-sm font-bold">
                {requests.length}
              </span>

            </div>

          </div>


          {/* Requests Content */}
          <div className="p-6">

            {requests.length === 0 ? (

              <div className="text-center py-10 bg-slate-50 rounded-xl">

                <div className="text-4xl mb-3">
                  🧹
                </div>

                <p className="font-medium text-slate-700">
                  No requests yet
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  Your cleaning requests will appear here.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {requests.map((request) => (

                  <div
                    key={request._id}
                    className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition"
                  >

                    {/* Request Title */}
                    <div className="flex justify-between items-start mb-5">

                      <div>
                        <p className="text-xs text-slate-400 uppercase">
                          Tank Type
                        </p>

                        <h3 className="text-lg font-semibold text-slate-800">
                          {request.tankType}
                        </h3>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          request.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : request.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : request.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {request.status}
                      </span>

                    </div>


                    {/* Request Details */}
                    <div className="grid sm:grid-cols-3 gap-5">

                      <div>
                        <p className="text-xs text-slate-400">
                          Tank Size
                        </p>

                        <p className="text-sm font-semibold text-slate-700 mt-1">
                          {request.tankSize}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Cleaning Date
                        </p>

                        <p className="text-sm font-semibold text-slate-700 mt-1">
                          {new Date(
                            request.preferredDate
                          ).toLocaleDateString("en-IN")}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Contact
                        </p>

                        <p className="text-sm font-semibold text-slate-700 mt-1">
                          {request.contact}
                        </p>
                      </div>

                    </div>


                    {/* Address */}
                    <div className="mt-5 pt-4 border-t border-slate-100">

                      <p className="text-xs text-slate-400">
                        Service Address
                      </p>

                      <p className="text-sm text-slate-700 mt-1">
                        📍 {request.address}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;