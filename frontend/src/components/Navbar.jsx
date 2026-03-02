import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-white text-xl font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          ✅ TodoApp
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-indigo-100 text-sm font-medium hidden sm:block">
                👋 {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-indigo-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-indigo-100 text-sm font-medium hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-indigo-50 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
