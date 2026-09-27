import { useEffect, useState } from "react";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRequests() {
    try {
      const response = await fetch("http://localhost:3000/requests", {
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to fetch requests");
        return;
      }

      setRequests(result.data || []);
    } catch (error) {
      console.log("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      const response = await fetch(
        `http://localhost:3000/requests/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to update status");
        return;
      }

      // Update UI immediately
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id
            ? {
                ...request,
                status,
              }
            : request
        )
      );
    } catch (error) {
      console.log("Error updating status:", error);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Loading requests...</p>
      </div>
    );
  }

  return (
    <div className="p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Requests
        </h1>

        <p className="text-gray-500 mt-1">
          Manage customer tank cleaning requests
        </p>
      </div>

      {/* Requests Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            All Requests
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Total requests: {requests.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Tank
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Address
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request._id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >

                  {/* Customer */}
                  <td className="px-6 py-5">
                    <p className="font-medium text-gray-800">
                      {request.user?.name || "Unknown"}
                    </p>

                    <p className="text-sm text-gray-400">
                      {request.user?.email || ""}
                    </p>
                  </td>

                  {/* Tank */}
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-gray-700">
                      {request.tankType}
                    </p>

                    <p className="text-sm text-gray-400">
                      {request.tankSize} L
                    </p>
                  </td>

                  {/* Address */}
                  <td className="px-6 py-5 max-w-xs">
                    <p className="text-sm text-gray-700">
                      {request.address}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-700">
                      {new Date(
                        request.preferredDate
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.status === "Pending"
                          ? "bg-orange-50 text-orange-600"
                          : request.status === "Confirmed"
                          ? "bg-blue-50 text-blue-600"
                          : request.status === "Completed"
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-5">
                    <select
                      value={request.status}
                      onChange={(e) =>
                        updateStatus(
                          request._id,
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>

                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 text-gray-400"
                  >
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminRequests;