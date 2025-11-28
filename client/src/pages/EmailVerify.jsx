import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'

const EmailVerify = () => {
    axios.defaults.withCredentials = true;

    const { backendUrl, isLoggedIn, userData, getUserData } = useContext(AppContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const inputRefs = React.useRef([])

    const handleInput = (e, index)=>{
        if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index)=>{
        if(e.key === 'Backspace' && e.target.value === '' && index > 0){
            inputRefs.current[index - 1].focus()
        }
    }

    const handlePaste = (e)=>{
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index)=>{
            if(inputRefs.current[index]){
                inputRefs.current[index].value = char;
            }
        })
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const otpArray = inputRefs.current.map(e => e.value)
            const otp = otpArray.join('')

            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', {otp})
            if (data.success) {
                toast.success(data.message)
                getUserData()
                navigate('/')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed')
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        isLoggedIn && userData && userData.isAccountVerified && navigate('/')
    },[isLoggedIn, userData])

  return (
    <div className='min-h-screen bg-linear-to-br from-green-50 to-green-100 flex items-center justify-center p-4'>
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
            to="/"
            className='absolute top-6 right-6 flex items-center gap-2 text-gray-600 hover:text-green-700 transition-colors'
        >
            <ArrowLeft size={20} />
            <span className='hidden sm:inline'>Back to Home</span>
        </Link>

        {/* Verification Card */}
        <div className='w-full max-w-md'>
            <form onSubmit={onSubmitHandler} className='bg-white rounded-2xl shadow-lg border border-gray-200 p-8'>
                {/* Icon Header */}
                <div className='text-center mb-6'>
                    <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <Mail size={32} className='text-green-600' />
                    </div>
                    <h1 className='text-2xl font-semibold text-gray-900 mb-2'>
                        Verify Your Email
                    </h1>
                    <p className='text-gray-600 text-sm'>
                        Enter the 6-digit verification code sent to your email address
                    </p>
                    {userData?.email && (
                        <p className='text-green-600 font-medium text-sm mt-2'>
                            {userData.email}
                        </p>
                    )}
                </div>

                {/* OTP Inputs */}
                <div className='mb-8'>
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
                                disabled={loading}
                                className='w-12 h-12 border-2 border-gray-300 text-gray-900 text-center text-xl font-semibold rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-white disabled:bg-gray-50 disabled:opacity-50'
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
                    disabled={loading}
                    className={`w-full py-3.5 bg-green-500 text-white rounded-full font-medium transition-all ${
                        loading 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'hover:bg-green-600 active:scale-95 shadow-lg shadow-green-200'
                    }`}
                >
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>
            </form>

            {/* Additional Help */}
            <div className='text-center mt-6'>
                <p className='text-xs text-gray-500'>
                    Having trouble? Contact our{' '}
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
  )
}

export default EmailVerify