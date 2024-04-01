import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import logo from "../../assets/Screenshot_2024-01-12_004511-removebg-preview (1).png";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Helper/Firebase";
import { useNavigate } from "react-router";

const FirebaseMobile = () => {
  const navigate=useNavigate()
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [showOtpField, setShowOtpField] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phoneNumber.trim() === "") {
      setPhoneNumberError("Please enter a mobile number.");
      setTimeout(() => {
        setPhoneNumberError("");
      }, 1000);
      return;
    }
    if (phoneNumber.length < 13) {
      setPhoneNumberError("Mobile must have 10 digits");
      setTimeout(() => {
        setPhoneNumberError("");
      }, 1000);
      return;
    }

    try {
      const recapta = new RecaptchaVerifier(auth, "recaptcha", {});
      recapta.render().then((widgetId) => {
        console.log("Recaptcha widget ID:", widgetId);
      });

      setTimer(60);
      setShowOtpField(true);
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recapta
      );
      console.log("Confirmation", confirmation);
      setUser(confirmation);
      console.log("OTP Verification ID:", confirmation.verificationId);
    } catch (err) {
      console.log("Error in sending otp", err);
    }
  };

  const handleResendOtp = () => {
    setTimer(60);
    handleSendOtp()
  };

  const handleVerifyOtp = async () => {
    try {
      const verified = await user.confirm(otp);
      console.log(verified);
      if (verified) {
        navigate("/provider/signup", { state: { phoneNumber: phoneNumber } })
        
      }else{
        navigate("/provider/register")
      }
    } catch (err) {
      console.log("Eroro in verify orp", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-full">
      <div className="flex flex-col md:flex-row rounded-lg shadow-md w-full md:w-4/5 lg:w-3/4 xl:w-2/3 bg-white">
        <div className="md:w-1/2 bg-fuchsia-700 flex items-center justify-center rounded-t-lg">
          <img
            src={logo}
            alt="Logo"
            className="w-auto h-auto max-h-full object-contain"
          />
        </div>
        <div className="md:w-1/2 p-8 shadow-2xl flex flex-col justify-between">
          <div className="mb-6 flex flex-col">
            <h2 className="text-3xl font-bold mb-2 text-center text-blue-900">
              Enter your mobile number
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-4 md:mb-0">
                <PhoneInput
                  country={"in"}
                  value={phoneNumber}
                  onChange={(value) => {
                    setPhoneNumber(value.startsWith("+") ? value : "+" + value);
                    setPhoneNumberError("");
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    padding: "0.5rem",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginBottom: "0.5rem",
                  }}
               
                />
                {phoneNumberError && (
                  <p className="text-red-500 text-lg mt-2">
                    {phoneNumberError}
                  </p>
                )}
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
                  onClick={handleSendOtp}
                  style={{ marginBottom: "0.5rem" }}
                >
                  Send OTP
                </button>
              </div>
            </div>
          </div>

          <div id="recaptcha" className="mb-3"></div>

          {showOtpField && (
            <div className="mb-4 flex flex-col">
              <input
                type="text"
                className="border border-gray-400 rounded py-2 px-4 w-full mb-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {timer > 0 ? (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                  disabled
                >
                  Resend OTP in {timer} seconds
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirebaseMobile;
