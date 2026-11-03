const BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

async function post(path, body, token) {          
  const url = `${BASE}${path.startsWith("/") ? path : "/" + path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),   
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

async function get(path, token) {
  const url = `${BASE}${path.startsWith("/") ? path : "/" + path}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || `Request failed (${res.status})`);
  return data;
}

export const authClient = {
  signup:         (values)              => post("/auth/signup", values),
  login:          ({ email, password }) => post("/auth/login", { email, password }),
  forgotpassword: ({ email })           => post("/auth/forgot-password", { email }),
  logout:         ()                    => post("/auth/logout", {}),
  me:             (token)               => get("/auth/me", token),

  createCheckoutSession: (items, token) =>                 
    post("/checkout/create-session", { items }, token),      
};