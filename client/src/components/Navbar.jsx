import { Link, useNavigate } from "react-router-dom";
import React, {  } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  
  const {userData, setIsLoggedIn, setUserData, backendUrl} = useContext(AppContext)
  const navigate = useNavigate()

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');

      if (data && data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        toast.success("Logged out successfully!");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to='/'>
          <img src="/logo.png" alt="logo" className="h-11 w-auto" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">Hi, {userData.name}</p>
          <button onClick={logout} className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all">Logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
