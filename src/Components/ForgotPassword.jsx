import { NavLink } from "react-router";
import gym from '../assets/gym.jpg';
import { useState } from 'react';

function ForgotPassword() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // Example API call placeholder:
      // await api.post('/api/auth/forgot-password', entries);
      setMessage('Password reset link sent to your email!');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
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
          <p className="text-xl font-mono font-bold text-gray-200 mb-4">Forgot Password</p>
          
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

          {/* Success or Error Messages */}
          {message && <p className="text-green-400 font-bold p-2">{message}</p>}
          {error && <p className="text-red-300 font-bold p-2">{error}</p>}

          {/* Submit */}
          <div className="p-2 mx-auto flex justify-center mt-4">
            <button
              type="submit"
              className="w-60 h-10 rounded-2xl border-2 cursor-pointer hover:bg-amber-700 border-gray-500 text-sm text-white font-medium font-sans bg-orange-500 text-center"
            >
              Send Reset Link
            </button>
            
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;