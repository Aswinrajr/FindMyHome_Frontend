import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import logo from "../../assets/logo.png";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../Helper/Firebase";
import { useNavigate } from "react-router";
import backgroundImage from "../../assets/queen-937501_1280.jpg";

function validNumber(number) {
  let cleanedNumber = number.replace(/\D/g, "");
  const regex = /^(?:\+?91)?[6-9]\d{9}$/;
  return regex.test(cleanedNumber);
}

const FirebaseMobile = () => {
  const navigate = useNavigate();
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
    if (phoneNumber.trim() === "" || !validNumber(phoneNumber)) {
      setPhoneNumberError("Please enter a valid mobile number.");
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
    handleSendOtp();
  };

  const handleVerifyOtp = async () => {
    try {
      const verified = await user.confirm(otp);
      console.log(verified);
      if (verified) {
        navigate("/provider/signup", { state: { phoneNumber: phoneNumber } });
      } else {
        navigate("/provider/register");
      }
    } catch (err) {
      console.log("Error in verify OTP", err);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        width: "full",
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">
          Enter your mobile number
        </h2>
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
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
              <p className="text-red-500 mt-1">{phoneNumberError}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
            >
              Send OTP
            </button>
          </div>
        </form>

        <div id="recaptcha" className="mb-3"></div>

        {showOtpField && (
          <div className="mt-4 space-y-4">
            <input
              type="text"
              className="border border-gray-400 rounded py-2 px-4 w-full"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex justify-between">
              {timer > 0 ? (
                <button
                  className="bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 opacity-50 cursor-not-allowed"
                  disabled
                >
                  Resend OTP in {timer} seconds
                </button>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FirebaseMobile;