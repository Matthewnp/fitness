// src/Components/Layout.jsx
import { NavLink, Outlet, useNavigate } from "react-router";
import gym from "../assets/gym.jpg";
import { useAuth } from "./useAuth";

export default function Layout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/trainer", { replace: true });
  };

  const displayName =
    user?.firstName || user?.email?.split("@")[0] || "there";

  return (
    <>
      <header className="bg-[#2b3852] rounded w-auto h-30 relative">
        <nav className="p-2 space-x-3 justify-between ml-auto flex w-auto  ">
          <div className="logo flex space-x-2 -mt-5">
            <NavLink
              to="/trainer"
              className="flex justify-center items-center p-1 gap-4"
            >
              <img src={gym} alt="gym" className="h-25 w-25 rounded-full p-2 mt-2" />
              <span className="inline text-white text-xl font-mono font-bold">
                Fitness
              </span>
            </NavLink>
          </div>

          <ul className="lg:flex -mt-8 md:flex space-x-1 p-1 items-center gap-5 justify-center whitespace-nowrap">
            <li>
              <NavLink
                to="/trainer"
                className={({ isActive }) =>
                  `font-bold font-mono text-sm ${isActive ? "text-gray-500" : "text-green-500"}`
                }
              >
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/membership"
                className={({ isActive }) =>
                  `font-bold font-mono text-sm ${isActive ? "text-gray-500" : "text-green-500"}`
                }
              >
                Membership-Tiers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `font-bold font-mono text-sm ${isActive ? "text-gray-500" : "text-green-500"}`
                }
              >
                Class-Schedule
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="text-white font-mono text-sm font-bold">
                  Hi {displayName}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-mono text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className="font-bold font-mono text-sm  text-green-500 px-2"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className="font-mono text-sm  font-bold bg-orange-500 hover:bg-orange-600 text-white px-2 py-2 rounded-full"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="border border-gray-700 w-auto relative"></div>
      </header>

      {/* 👇 the current page renders here */}
      <main>
        <Outlet />
      </main>
    </>
  );
}