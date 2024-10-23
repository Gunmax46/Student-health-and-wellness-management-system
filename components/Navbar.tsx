import { Link } from 'react-router-dom';
import { Heart, Brain, Salad, User as UserIcon, LogOut } from 'lucide-react';

interface User {
  name: string;
  avatar?: string;
}

const Navbar = ({ user }: { user: User | null }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-rose-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">WellnessHub</span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/resources"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <Brain className="h-5 w-5 mr-1" />
                Resources
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                <Salad className="h-5 w-5 mr-1" />
                Programs
              </Link>
              <Link
                to="/support"
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Support
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <UserIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </Link>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <LogOut className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
