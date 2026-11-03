import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { authClient } from "./authClient";

export default function ProtectRoute({ children }) {
  const [status, setStatus] = useState(() =>
    localStorage.getItem("token") ? "checking" : "unauthorized"
  );

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem("token");

    if (!token) {
      return () => {
        active = false;
      };
    }

    authClient
      .me(token)
      .then(() => {
        if (active) setStatus("authorized");
      })
      .catch(() => {
        if (active) {
          localStorage.removeItem("token");
          setStatus("unauthorized");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") return <p>Loading…</p>;
  if (status !== "authorized") return <Navigate to="/login" replace />;

  return children;
}