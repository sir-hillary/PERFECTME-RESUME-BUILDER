import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import { 
  Menu, 
  X, 
  Mail,
  LogOut,
  User,
  ChevronDown
} from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      
      if (data.success) {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
        navigate('/email-verify');
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/logout');

      if (data && data.success) {
        setIsLoggedIn(false);
        setUserData(false);
        setDropdownOpen(false);
        setMobileMenuOpen(false);
        toast.success("Logged out successfully!");
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDropdownAction = (action) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    action();
  };

  const handleMobileAction = (action) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-12 lg:px-24 absolute z-50 bg-white/80 backdrop-blur-sm">
        {/* Logo */}
        <Link to="/">
          <img src='/logo.png' alt="logo"  className="h-11 w-auto" />
        </Link>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8 text-slate-800">
          <a href="#" className="hover:text-green-600 transition font-medium">Home</a>
          <a href="#features" className="hover:text-green-600 transition font-medium">Features</a>
          <a href="#testimonials" className="hover:text-green-600 transition font-medium">Testimonials</a>
          <a href="#contact" className="hover:text-green-600 transition font-medium">Contact</a>
        </div>

        {/* Desktop Authentication Section */}
        <div className="hidden md:flex items-center">
          {userData ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all border border-gray-200"
              >
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-linear-to-br from-green-500 to-green-600 text-white font-medium shadow-sm">
                  {userData.name[0].toUpperCase()}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-700 font-medium text-sm max-w-24 truncate">
                    {userData.name.split(' ')[0]}
                  </span>
                  <ChevronDown 
                    size={14} 
                    className={`text-gray-400 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </button>

              {/* Desktop Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  {/* User Info Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white font-medium text-sm">
                        {userData.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {userData.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {userData.email}
                        </p>
                      </div>
                    </div>
                    {userData.isAccountVerified ? (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600 font-medium">Email Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        <span className="text-xs text-amber-600 font-medium">Unverified Email</span>
                      </div>
                    )}
                  </div>

                  {/* Dropdown Actions */}
                  <div className="py-1">
                    {!userData.isAccountVerified && (
                      <button
                        onClick={() => handleDropdownAction(sendVerificationOtp)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                      >
                        <Mail size={16} className="text-gray-400 group-hover:text-green-600" />
                        <span>Verify Email</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDropdownAction(() => navigate("/app"))}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                    >
                      <User size={16} className="text-gray-400 group-hover:text-blue-600" />
                      <span>Dashboard</span>
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={() => handleDropdownAction(logout)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                    >
                      <LogOut size={16} className="text-red-500 group-hover:text-red-600" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 border border-gray-300 rounded-full px-6 py-2.5 text-gray-800 hover:bg-gray-50 transition-all font-medium hover:shadow-sm"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button - Hidden on desktop */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden">
          <div 
            ref={mobileMenuRef}
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 transform transition-transform duration-300"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <img src='/logo.png' alt="logo" className="w-28" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col gap-4 text-slate-800">
                <a 
                  href="#" 
                  className="py-2 hover:text-green-600 transition font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a 
                  href="#features" 
                  className="py-2 hover:text-green-600 transition font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#testimonials" 
                  className="py-2 hover:text-green-600 transition font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <a 
                  href="#contact" 
                  className="py-2 hover:text-green-600 transition font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Mobile Authentication Section */}
            <div className="p-6">
              {userData ? (
                <div className="space-y-4">
                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 flex justify-center items-center rounded-full bg-linear-to-br from-green-500 to-green-600 text-white font-medium">
                      {userData.name[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {userData.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userData.email}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Menu Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMobileAction(() => navigate("/app"))}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors rounded-lg group"
                    >
                      <User size={18} className="text-gray-400 group-hover:text-blue-600" />
                      <span>Dashboard</span>
                    </button>

                    {!userData.isAccountVerified && (
                      <button
                        onClick={() => handleMobileAction(sendVerificationOtp)}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors rounded-lg group"
                      >
                        <Mail size={18} className="text-gray-400 group-hover:text-green-600" />
                        <span>Verify Email</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleMobileAction(logout)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg group"
                    >
                      <LogOut size={18} className="text-red-500 group-hover:text-red-600" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full px-6 py-3 text-gray-800 hover:bg-gray-50 transition-all font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;