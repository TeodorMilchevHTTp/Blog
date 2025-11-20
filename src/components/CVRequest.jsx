import React, { useState, useEffect } from "react";
import AdminCVRequests from "./AdminCVRequests";

const CVRequest = () => {
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && JSON.parse(user).role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (submitted && email) {
      const checkStatus = async () => {
        try {
          const res = await fetch(`/api/cv/request-status?email=${email}`);
          const data = await res.json();
          setStatus(data.status);
        } catch (err) {
          console.error(err);
        }
      };
      checkStatus();
      const interval = setInterval(checkStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [submitted, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !reason) return alert("Please fill all fields");

    try {
      const res = await fetch("/api/cv/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit request");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err); // Log the error in the console for debugging
      alert("Something went wrong: " + err.message); // Show the error message in alert
    }
  };


  if (isAdmin) return <AdminCVRequests />;

  return (
    <div className="w-full">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-white mb-2">Request My CV</h2>
          <p className="text-sm text-slate-400">
            Fill in your email and reason to receive my CV.
          </p>

          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-lg bg-black/40 border border-cyan-600/30 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            required
          />

          <textarea
            placeholder="Reason for requesting CV"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            className="px-4 py-2 rounded-lg bg-black/40 border border-cyan-600/30 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            required
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold shadow-[0_8px_30px_rgba(0,204,255,0.12)] hover:translate-y-[-1px] transition-transform"
          >
            Submit Request
          </button>
        </form>
      ) : (
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">Request Submitted!</h2>
          {status ? (
            <p className="text-slate-300">Status: {status}</p>
          ) : (
            <p className="text-slate-400">Waiting for admin approval...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CVRequest;
