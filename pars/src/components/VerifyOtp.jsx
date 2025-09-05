import React, { useState, useRef, useEffect } from "react"
import { CheckCircle, AlertCircle } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export default function OTPVerificationPage() {

  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || ""
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus()
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
  
    try {
        const response = await fetch("http://localhost:4000/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp: otpValue }),
        });
        const data = await response.json();
        if (response.ok && data.success) {
            setSuccess(true);
            setError("");
            toast.success("OTP verified successfully!");
            navigate("/signin");
        } else {
            setError(data.error || "Failed to verify OTP. Please try again.");
            setSuccess(false);
            toast.error(data.error || "Failed to verify OTP. Please try again.");
        }

    } catch (err) {
        console.error("Error verifying OTP:", err);
        setError("Server error. Please try again later.");
        setSuccess(false);
        toast.error("Server error. Please try again later.");
    }
  };
  

  const handleResendOTP = () => {
    // Here you would typically call your API to resend the OTP
    console.log("Resending OTP")
    setError("")
    setOtp(["", "", "", "", "", ""])
    inputRefs.current[0].focus()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a 6-digit OTP to your email address. Please enter it below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {success ? (
            <div className="text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-2 text-xl font-semibold text-gray-900">Verification Successful</h3>
              <p className="mt-2 text-gray-600">Your account has been verified successfully.</p>
              <button
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/signin")
                  }, 1300);
                }}
              >
                Continue
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <div className="mt-1 flex justify-between">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-12 h-12 text-center form-input rounded-md shadow-sm focus:ring-rose-500 focus:border-rose-500"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="flex items-center text-sm text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          )}

          {!success && (
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResendOTP}
                  className="font-medium text-rose-600 hover:text-rose-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

