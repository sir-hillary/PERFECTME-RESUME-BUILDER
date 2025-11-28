import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Lock, Mail, ArrowLeft, KeyRound } from "lucide-react";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const enteredOtp = otpArray.join("");
    setOtp(enteredOtp);
    setIsOtpSubmitted(true);
  };

  const OnSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      {/* Header with Logo */}
      <div className='absolute top-0 left-0 w-full p-6'>
        <Link to="/" className="inline-block">
          <img 
            src='/logo.png' 
            alt="logo" 
            className='h-10 w-auto hover:opacity-80 transition-opacity' 
          />
        </Link>
      </div>

      {/* Back Button */}
      <Link 
        to="/login"
        className='absolute top-6 right-6 flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors'
      >
        <ArrowLeft size={20} />
        <span className='hidden sm:inline'>Back to Login</span>
      </Link>

      {/* Reset Password Card */}
      <div className='w-full max-w-md'>
        {/* Step 1: Enter Email */}
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className='bg-white rounded-2xl shadow-lg border border-gray-200 p-8'>
            {/* Icon Header */}
            <div className='text-center mb-6'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Mail size={32} className='text-green-600' />
              </div>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                Reset Password
              </h1>
              <p className='text-gray-600 text-sm'>
                Enter your registered email address to receive a verification code
              </p>
            </div>

            {/* Email Input */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white disabled:bg-gray-50"
                  placeholder="Enter your email address"
                  type="email"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 bg-green-500 text-white rounded-full font-medium transition-all ${
                loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-green-600 active:scale-95 shadow-lg shadow-green-200'
              }`}
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        )}

        {/* Step 2: Enter OTP */}
        {!isOtpSubmitted && isEmailSent && (
          <form onSubmit={onSubmitOtp} className='bg-white rounded-2xl shadow-lg border border-gray-200 p-8'>
            {/* Icon Header */}
            <div className='text-center mb-6'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <KeyRound size={32} className='text-green-600' />
              </div>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                Enter Verification Code
              </h1>
              <p className='text-gray-600 text-sm'>
                Enter the 6-digit code sent to your email
              </p>
              <p className='text-green-600 font-medium text-sm mt-2'>
                {email}
              </p>
            </div>

            {/* OTP Inputs */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Verification Code
              </label>
              <div 
                className='flex justify-between gap-3' 
                onPaste={handlePaste}
              >
                {Array(6).fill(0).map((_, index)=>(
                  <input 
                    ref={e => inputRefs.current[index] = e} 
                    onInput={(e)=> handleInput(e, index)} 
                    onKeyDown={(e) => handleKeyDown(e, index)} 
                    type="text" 
                    maxLength='1' 
                    key={index} 
                    required 
                    className='w-12 h-12 border-2 border-gray-300 text-gray-900 text-center text-xl font-semibold rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white'
                  />
                ))}
              </div>
              <p className='text-xs text-gray-500 mt-3 text-center'>
                Paste your code or type it in
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-3.5 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 active:scale-95 shadow-lg shadow-green-200 transition-all"
            >
              Verify Code
            </button>

            {/* Resend Option */}
            <div className='text-center mt-4'>
              <button
                type='button'
                className='text-sm text-green-600 hover:text-green-700 transition-colors'
                onClick={() => toast.info('Resend functionality to be implemented')}
              >
                Didn't receive the code? Resend
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Enter New Password */}
        {isOtpSubmitted && isEmailSent && (
          <form onSubmit={OnSubmitNewPassword} className='bg-white rounded-2xl shadow-lg border border-gray-200 p-8'>
            {/* Icon Header */}
            <div className='text-center mb-6'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Lock size={32} className='text-green-600' />
              </div>
              <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                Create New Password
              </h1>
              <p className='text-gray-600 text-sm'>
                Enter your new password below
              </p>
            </div>

            {/* Password Input */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white disabled:bg-gray-50"
                  placeholder="Enter your new password"
                  type="password"
                />
              </div>
              <p className='text-xs text-gray-500 mt-2'>
                Make sure your password is strong and secure
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 bg-green-500 text-white rounded-full font-medium transition-all ${
                loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-green-600 active:scale-95 shadow-lg shadow-green-200'
              }`}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Additional Help */}
        <div className='text-center mt-6'>
          <p className='text-xs text-gray-500'>
            Need help? Contact our{' '}
            <a href='mailto:support@kuzacareerai.com' className='text-green-600 hover:text-green-700'>
              support team
            </a>
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className='absolute bottom-10 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30 -z-10'></div>
      <div className='absolute top-10 right-10 w-72 h-72 bg-green-300 rounded-full blur-3xl opacity-20 -z-10'></div>
    </div>
  );
};

export default ResetPassword;