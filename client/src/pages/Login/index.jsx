import React from "react";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center relative overflow-hidden text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/50 to-violet-600/50 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-400"></div>
          <div className="relative px-12 pt-6 pb-2 bg-white/20 ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center justify-center">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
