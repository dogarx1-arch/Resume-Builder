import React, { useState, useEffect } from 'react';
import { User2Icon, Mail, Lock } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from "../app/features/authSlice";
import api from "../Configs/api";
import { toast } from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const urlState = query.get('state');
    if (urlState === 'login' || urlState === 'signup') {
      setState(urlState);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleState = (e) => {
    e.preventDefault();
    setState(prev => (prev === "login" ? "signup" : "login"));
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const endpoint = state === "login" ? "login" : "register";

      const { data } = await api.post(`/api/users/${endpoint}`, formData);

      
      dispatch(login(data));

      
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      toast.success(data.message || "Success!");
    } catch (error) {
      
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
      console.error("Auth Error:", error.response?.data);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
      <form onSubmit={handleSubmit} className="sm:w-[380px] w-full text-center border border-gray-200 rounded-2xl px-8 bg-white shadow-sm">
        <h1 className="text-gray-900 text-3xl mt-10 font-semibold">
          {state === "login" ? "Login" : "Create Account"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {state === "login" ? "Welcome back! Please login." : "Join us! Please sign up."}
        </p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-gray-50 border border-gray-300 h-12 rounded-full px-5 gap-3 focus-within:border-green-500 transition-colors">
            <User2Icon size={18} className="text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="bg-transparent border-none outline-none w-full text-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-300 h-12 rounded-full px-5 gap-3 focus-within:border-green-500 transition-colors">
          <Mail size={18} className="text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="bg-transparent border-none outline-none w-full text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-gray-50 border border-gray-300 h-12 rounded-full px-5 gap-3 focus-within:border-green-500 transition-colors">
          <Lock size={18} className="text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent border-none outline-none w-full text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {state === "login" && (
          <div className="mt-3 text-left">
            <button type="button" className="text-xs text-green-600 hover:text-green-800 transition-colors">
              Forgot password?
            </button>
          </div>
        )}

        <button type="submit" className="mt-6 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-700 font-medium transition-all shadow-md active:scale-[0.98]">
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p className="text-gray-500 text-sm mt-6 mb-10">
          {state === "login" ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            type="button"
            onClick={toggleState}
            className="text-green-600 font-medium hover:underline focus:outline-none"
          >
            {state === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;