import { useEffect, useState } from "react";

const AdminHome = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    try {
      const response = await fetch(
        "http://localhost:3000/requests",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setRequests(data.data || []);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  // Calculate request counts
  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending"
  ).length;

  const completedRequests = requests.filter(
    (request) => request.status === "Completed"
  ).length;

  const confirmedRequests = requests.filter(
    (request) => request.status === "Confirmed"
  ).length;

  return (
    <div className="p-6 md:p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Overview of your tank cleaning service
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading dashboard...
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

            {/* Total */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Requests
              </p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {totalRequests}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                All service requests
              </p>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-orange-500 mt-2">
                {pendingRequests}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                Waiting for action
              </p>
            </div>

            {/* Confirmed */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Confirmed
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {confirmedRequests}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                Confirmed requests
              </p>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-2">
                {completedRequests}
              </h2>

              <p className="text-xs text-gray-400 mt-2">
                Completed services
              </p>
            </div>

          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Requests
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Latest tank cleaning requests
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">

                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                      Customer
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                      Tank Type
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                      Date
                    </th>

                    <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {requests.slice(0, 5).map((request) => (
                    <tr
                      key={request._id}
                      className="border-t border-gray-100"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {request.user?.name || "Unknown"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {request.tankType}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {request.preferredDate}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            request.status === "Pending"
                              ? "bg-orange-50 text-orange-600"
                              : request.status === "Completed"
                              ? "bg-green-50 text-green-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {requests.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-8 text-gray-400"
                      >
                        No requests found
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;