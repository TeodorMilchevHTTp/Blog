import React, { useState, useEffect } from 'react';

const CVRequest = () => {
  const [reason, setReason] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user && JSON.parse(user).role === 'admin') {
      setIsAdmin(true);
      fetchRequests();
    }
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/cv/requests');
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !reason) return alert("Please fill all fields");
    try {
      const res = await fetch('/api/cv/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, reason }),
      });
      if (!res.ok) throw new Error('Failed to submit request');
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApprove = async (id) => {
  try {
    const res = await fetch(`/api/cv/approve/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' }), // ✅ Send status
    });
    const data = await res.json();
    //alert(data.message);
    fetchRequests();
  } catch (err) {
    console.error('Error approving request:', err);
  }
};

const handleDeny = async (id) => {
  try {
    const res = await fetch(`/api/cv/approve/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'rejected' }), // ✅ Use same route, status = rejected
    });
    const data = await res.json();
    //alert(data.message);
    fetchRequests();
  } catch (err) {
    console.error('Error denying request:', err);
  }
};


  if (isAdmin) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-primary-100 text-center">CV Requests</h2>
        {requests.length === 0 ? (
          <p className="text-center text-gray-400">No pending requests.</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li key={req._id} className="border p-4 rounded-lg bg-gray-50 dark:bg-white/10 flex justify-between items-center">
                <div>
                  <p><strong>Email:</strong> {req.email}</p>
                  <p><strong>Reason:</strong> {req.reason}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => handleApprove(req._id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Approve</button>
                  <button onClick={() => handleDeny(req._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Deny</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  }

  if (submitted) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-primary-100 mb-2">Request Submitted!</h2>
        <p className="text-gray-600 dark:text-slate-300">
          Thank you! Your CV request has been received. You’ll get an email once approved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-primary-100 text-center">Request My CV</h2>

      <textarea
        placeholder="Why do you want the CV?"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        className="w-full p-3 rounded border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
        rows={4}
      />

      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded border border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-[#1f1f1f] text-gray-900 dark:text-white"
      />

      <button
        type="submit"
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-md transition"
      >
        Submit Request
      </button>
    </form>
  );
};

export default CVRequest;
