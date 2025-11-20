import { useEffect, useState } from "react";

const AdminCVRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(""); // 'approved' or 'rejected'
  const [processing, setProcessing] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/cv/requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setModalOpen(true);
  };

  const handleAction = async () => {
    if (!selectedRequest || !actionType) return;
    setProcessing(true);
    try {
      const res = await fetch(`/api/cv/approve/${selectedRequest._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: actionType }),
      });
      const data = await res.json();
      console.log(data);
      setModalOpen(false);
      setSelectedRequest(null);
      setActionType("");
      fetchRequests();
    } catch (err) {
      console.error("Error updating request:", err);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 py-10">
        Loading requests...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-lg p-2 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary-100">
        Admin - CV Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200 dark:border-white/10">
                <th className="p-3">Email</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr
                  key={req._id}
                  className="border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-3">{req.email}</td>
                  <td className="p-3">{req.reason}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    {req.status === "pending" && (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openModal(req, "approved")}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => openModal(req, "rejected")}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Confirm {actionType === "approved" ? "Approval" : "Rejection"}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
              Are you sure you want to{" "}
              <span className="font-bold">{actionType}</span> this CV request
              for <span className="font-semibold">{selectedRequest.email}</span>
              ?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleAction}
                disabled={processing}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:opacity-50"
              >
                {processing ? "Processing..." : "Yes, Confirm"}
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-5 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCVRequests;
