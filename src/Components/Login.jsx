import { NavLink, useNavigate, Link } from "react-router";
import gym from '../assets/gym.jpg';
import { useState } from 'react';
import { useAuth } from './useAuth';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const values = Object.fromEntries(new FormData(e.target).entries());

    try {
      const result = await login(values);

      // Guard against login() returning a failure object instead of throwing
      if (result && result.success === false) {
        setError(result.message || 'Invalid email or password');
        return;
      }

      navigate('/trainer');
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <header className="bg-[#2b3852] rounded w-auto h-30 relative">
        <nav className="p-2 justify-between ml-auto flex  w-auto">
          <div className="logo flex space-x-2">
            <div className="flex justify-center items-center p-1 gap-1">
              <img
                src={gym}
                alt="gym img"
                className="h-25 w-25 rounded-full  cursor-pointer"
              />
              <span className="inline text-white text-xl font-mono font-bold">Fitness</span>
            </div>
          </div>

          <ul className="lg:flex  md:flex gap-2 grid space-x-1 p-1 items-center  justify-center z-50 relative">
            <li>
              <NavLink
                to="/trainer"
                className={({ isActive }) =>
                  `font-bold font-mono text-sm ${isActive ? 'text-gray-500' : 'text-green-500'}`
                }
              >
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/membership"
                className={({ isActive }) =>
                  `font-bold font-mono text-sm ${isActive ? 'text-gray-500' : 'text-green-500'}`
                }
              >
                Membership-Tiers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `font-bold font-mono text-sm ${isActive ? 'text-gray-500' : 'text-green-500'}`
                }
              >
                Class-Schedule
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="border border-gray-700 w-auto relative"></div>
      </header>

      <div className="flex justify-center py-2 h-screen w-auto mx-auto bg-[#1a1d24]">
        <form
          onSubmit={handleSubmit}
          className="p-5 w-auto h-auto relative text-gray-400 mt-10 bg-gray-900 rounded border-2 border-orange-800 shadow-2xl shadow-orange-700"
        >
          {/* Email */}
          <div className="p-2">
            <label htmlFor="email" className="block text-sm font-mono font-bold mb-1 text-gray-200">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="enter your email"
              className="w-full h-10 rounded p-2 border-2 border-gray-200 text-sm font-medium font-sans text-amber-50 bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="p-2">
            <label
              htmlFor="password"
              className="block text-sm font-mono font-bold mb-1 text-gray-200"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="enter your password"
              className="w-full h-10 rounded p-2 border-2 border-gray-200 text-sm text-amber-50 font-medium font-sans bg-transparent"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-300 font-bold p-2">{error}</p>}

          {/* Submit & Register Link */}
          <div className="p-2 mx-auto flex flex-col items-center gap-3">
            <button
              type="submit"
              className="w-60 h-10 rounded-2xl border-2 cursor-pointer hover:bg-amber-700 border-gray-500 text-sm text-white font-medium font-sans bg-orange-500 text-center"
            >
              Login
            </button>
            <Link to="/signup" className="text-sm text-white underline hover:text-gray-200">
              Create account
            </Link>
            <Link
              to="/forgotpassword"
              className="text-sm text-white underline hover:text-gray-200"
            >
              Forgot Password
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;