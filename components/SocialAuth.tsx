import React from 'react';
import { Github } from 'lucide-react';

const SocialAuth = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:3000/api/auth/github';
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <img
          src="https://www.google.com/favicon.ico"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <button
        onClick={handleGithubLogin}
        className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <Github className="w-5 h-5" />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialAuth;