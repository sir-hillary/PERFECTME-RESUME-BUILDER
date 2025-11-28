/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Lock, Mail, User2Icon } from 'lucide-react';
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, setIsLoggedIn, setUserData, getUserData } = useContext(AppContext);

  const navigate = useNavigate();
  
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = useState(urlState || "login")
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (state === "login") {
        // Login API call
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });

        if (data.success) {
          toast.success('Login successful!');
          setIsLoggedIn(true);
          await getUserData();
          navigate('/app/dashboard')
        } else {
          toast.error(data.message);
        }
      } else {
        // Register API call
        const {data} = await axios.post(`${backendUrl}/api/auth/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });

        if (data.success) {
          toast.success('Registration successful! Please check your email for verification.');
          setState("login");
          setFormData({ name: '', email: '', password: '' });
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast.error(error.response?.data?.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email address first');
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, {
        email: formData.email
      });

      if (data.success) {
        toast.success('Password reset OTP sent to your email!');
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending reset OTP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#6B7280"/>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 flex-1"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
        )}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 flex-1"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Lock size={13} color="#6B7280" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 flex-1"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
       {state === 'login' && (
         <div className="mt-4 text-left text-green-500">
          <button 
            type="button" 
            className="text-sm hover:underline"
            onClick={() => navigate("/reset-password")}
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>
       )}
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 w-full h-11 rounded-full text-white bg-green-500 transition-opacity ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
          }`}
        >
          {loading ? 'Processing...' : (state === "login" ? "Login" : "Sign up")}
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setState(prev => prev === "login" ? "register" : "login")}
            className="text-green-500 hover:underline bg-none border-none"
            disabled={loading}
          >
            click here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;