// src/Components/Success.jsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

const POLL_INTERVAL_MS = 2000;
const MAX_ATTEMPTS = 10;

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [status, setStatus] = useState("checking");
  const [orderId, setOrderId] = useState(null);
  const [total, setTotal] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");

  // 👇 derived state — no setState, no effect
  const missingSession = !sessionId;
  const effectiveStatus = missingSession ? "error" : status;
  const effectiveMessage = missingSession
    ? "Missing session ID in the URL."
    : message;

  useEffect(() => {
    // Don't run the polling loop when there's no session ID
    if (!sessionId) return;

    let cancelled = false;
    let timer;

    async function checkOnce() {
      try {
        const res = await fetch(`/api/checkout/order-status/${sessionId}`);
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;

        if (res.status === 404) { scheduleNext(); return; }
        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || `Server error (${res.status})`);
          return;
        }

        setOrderId(data.orderId);
        setTotal(data.total);

        if (data.status === "paid") { setStatus("paid"); return; }
        if (data.status === "failed" || data.status === "cancelled") {
          setStatus(data.status);
          return;
        }
        scheduleNext();
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setMessage(err.message);
      }
    }

    function scheduleNext() {
      setAttempts((a) => {
        const next = a + 1;
        if (next >= MAX_ATTEMPTS) { setStatus("pending"); return next; }
        timer = setTimeout(checkOnce, POLL_INTERVAL_MS);
        return next;
      });
    }

    checkOnce();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [sessionId]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#1a1d24] p-6 text-white">
      <div className="max-w-md w-full bg-[#2b3852] rounded-2xl p-8 text-center shadow-xl">
        {effectiveStatus === "checking" && (
          <>
            <div className="text-5xl mb-4">⏳</div>
            <h1 className="text-2xl font-bold mb-2">Confirming your payment…</h1>
            <p className="text-gray-300 text-sm">Usually takes a few seconds.</p>
            <p className="text-gray-500 text-xs mt-3">Attempt {attempts + 1} of {MAX_ATTEMPTS}</p>
          </>
        )}
        {effectiveStatus === "paid" && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-2xl font-bold mb-2">Payment successful</h1>
            <p className="text-gray-300 mb-1">Order <span className="font-mono text-white">#{orderId}</span> confirmed</p>
            {total != null && <p className="text-gray-300 mb-4">Charged <span className="font-bold text-white">${total.toFixed(2)}</span></p>}
            <Link to="/dashboard" className="inline-block mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full">
              Go to dashboard
            </Link>
          </>
        )}
        {effectiveStatus === "pending" && (
          <>
            <div className="text-5xl mb-4">⏱️</div>
            <h1 className="text-2xl font-bold mb-2">Almost there…</h1>
            <p className="text-gray-300 mb-4">Webhook is running late — refresh in a few seconds.</p>
            <button onClick={() => window.location.reload()} className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full">
              Check again
            </button>
          </>
        )}
        {(effectiveStatus === "failed" || effectiveStatus === "cancelled") && (
          <>
            <div className="text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Payment {effectiveStatus}</h1>
            <p className="text-gray-300 mb-4">No charge was made.</p>
            <Link to="/membership" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full">
              Try again
            </Link>
          </>
        )}
        {effectiveStatus === "error" && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-300 mb-4">{effectiveMessage}</p>
            <Link to="/membership" className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-full">
              Back to plans
            </Link>
          </>
        )}
      </div>
    </main>
  );
}