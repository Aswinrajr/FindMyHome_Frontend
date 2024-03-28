// import React, { useState } from "react";
// import axios from "axios";
// import Razorpay from "razorpay";

// const Payment = ({ roomData, user }) => {
//   const [paymentStatus, setPaymentStatus] = useState(null);

//   const handlePayment = async () => {
//     const razorpay = new Razorpay({
//       key: "YOUR_RAZORPAY_KEY_ID",
//       amount: roomData.amount * 100,
//       currency: "INR",
//       name: "Your Company Name",
//       description: "Payment for Room Booking",
//       image: "https://your-company-logo.png",
//       handler: function (response) {

//         setPaymentStatus("success");
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "Customer Contact Number",
//       },
//       notes: {

//       },
//     });

//     razorpay.open();
//   };

//   return (
//     <div>
//       <h3>Make Payment</h3>
//       <button onClick={handlePayment}>Proceed to Payment</button>
//       {paymentStatus === "success" && <p>Payment successful!</p>}
//     </div>
//   );
// };

// export default Payment;
