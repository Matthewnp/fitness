
import { useEffect, useState } from "react";
import { authClient } from "./authClient";
import { AuthContext } from "./AuthContext";   

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"));

  useEffect(() => {
    if (!token) return;
authClient
.me(token)
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const persist = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);
  };

  const signup = async (values) => {
    const data = await authClient.signup(values);
    persist(data);
    return data;
  };

  const login = async (values) => {
    const data = await authClient.login(values);
    persist(data);
    return data;
  };

  const forgotpassword = (values) => authClient.forgotpassword(values);
  const resetpassword = (values) => authClient.resetpassword(values);

  const logout = async () => {
    try {
      await authClient.logout();
    } catch (error) {
      console.error("Server logout failed, clearing local session anyway:", error);
    }
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

return (
    <AuthContext.Provider   
      value={{

        user,
        token,
        loading,
        isAuthenticated: !!user,
        signup,
        login,
        forgotpassword,
        resetpassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}