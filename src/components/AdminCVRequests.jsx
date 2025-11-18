import { useEffect, useState } from 'react';

const AdminCVRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/cv/requests');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const res = await fetch(`/api/cv/approve/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      console.log(data);
      fetchRequests(); // refresh
    } catch (err) {
      console.error('Error updating request:', err);
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
    <div className="bg-white dark:bg-[#1f1f1f] rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary-100">Admin - CV Requests</h2>
      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200 dark:border-white/10">
              <th className="p-2">Email</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Status</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr
                key={req._id}
                className="border-b border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="p-2">{req.email}</td>
                <td className="p-2">{req.reason}</td>
                <td className="p-2 capitalize">{req.status}</td>
                <td className="p-2 text-right">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleAction(req._id, 'approved')}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(req._id, 'rejected')}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        req.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {req.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCVRequests;
