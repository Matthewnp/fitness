import { NavLink } from "react-router";
import gym from '../assets/gym.jpg';
import { useState } from 'react';

function PasswordReset() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const formData = new FormData(e.target);
    const entries = Object.fromEntries(formData.entries());

    // Simple validation check
    if (entries.password !== entries.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      // Example API call placeholder:
      // await api.post('/api/auth/reset-password', entries);
      setMessage('Password successfully reset!');
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    }
  };

  return (
    <>
      <header className="bg-[#2b3852] rounded w-auto h-30 relative">
        <nav className="p-2 space-x-3 justify-between ml-auto flex w-auto">
          <div className="logo flex space-x-2">
            <a className="flex justify-center items-center p-1 gap-4">
              <img src={gym} alt="gym img" className="h-25 w-25 rounded-full p-2 mt-2 cursor-pointer"/>
              <span className="inline text-white text-xl font-mono font-bold">Fitness</span>
            </a>
          </div>

          <ul className="flex space-x-1 p-1 items-center gap-5 justify-center z-50 relative">
            <li>
              <NavLink to="/trainer" className={({isActive}) => `font-bold font-mono text-xl ${isActive ? 'text-gray-500' : 'text-green-500'}`}>
                Trainers
              </NavLink>
            </li>
            <li>
              <NavLink to="/membership" className={({isActive}) => `font-bold font-mono text-xl ${isActive ? 'text-gray-500' : 'text-green-500'}`}>
                Membership-Tiers
              </NavLink>
            </li>
            <li>
              <NavLink to="/schedule" className={({isActive}) => `font-bold font-mono text-xl ${isActive ? 'text-gray-500' : 'text-green-500'}`}>
                Class-Schedule
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="border border-gray-700 w-auto relative"></div>
      </header>

      <div className="flex justify-center py-2 h-screen w-auto mx-auto bg-[#1a1d24]">
        {/* FIXED: Added onSubmit here instead of onClick on the button */}
        <form
          onSubmit={handleSubmit}
          className="p-5 w-auto h-auto relative text-gray-400 mt-10 bg-gray-900 rounded border-2 border-orange-800 shadow-2xl shadow-orange-700"
        >
          <p className="text-xl font-mono font-bold text-gray-200 mb-4">Reset Password</p>

          {/* New Password */}
          <div className="p-2">
            <label htmlFor="password" className="block text-sm font-mono font-bold mb-1 text-gray-200">
              New Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="enter your new password"
              className="w-full h-10 rounded p-2 border-2 border-gray-200 text-sm text-amber-50 font-medium font-sans bg-transparent"
            />
          </div>

          {/* Confirm Password - FIXED: Unique ID and name */}
          <div className="p-2">
            <label htmlFor="confirmPassword" className="block text-sm font-mono font-bold mb-1 text-gray-200">
              Confirm Password:
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              placeholder="confirm password"
              className="w-full h-10 rounded p-2 border-2 border-gray-200 text-sm text-amber-50 font-medium font-sans bg-transparent"
            />
          </div>

          {/* Messages */}
          {message && <p className="text-green-400 font-bold p-2">{message}</p>}
          {error && <p className="text-red-300 font-bold p-2">{error}</p>}

          {/* Submit */}
          <div className="p-2 mx-auto flex justify-center mt-4">
            <button
              type="submit"
              className="w-60 h-10 rounded-2xl border-2 cursor-pointer hover:bg-amber-700 border-gray-500 text-sm text-white font-medium font-sans bg-orange-500 text-center"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PasswordReset;