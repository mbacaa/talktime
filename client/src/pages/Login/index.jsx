import React from "react";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative overflow-hidden sm:py-12 text-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-12 pt-6 pb-2 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
