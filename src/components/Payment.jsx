// import React from 'react'

// const Payment = () => {
//   return (
//     <>
//     <div>
//         <h1 className='text-center text-4xl font-medium'>Payment</h1>
//         <p className='text-center'>(Free trial is for 7 days) </p>
//     </div>
//     <div className='my-10 '>
//         <p className='text-center'>Click on the Pay Button for continue using the app</p>
//         <button className="btn btn-active btn-accent mx-[740px] my-10">Pay</button>
//     </div>
//     </>
//   )
// }

// export default Payment

// import { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// const Payment = () => {
//   const [paymentError, setPaymentError] = useState(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(null);
//   const user = useSelector((store) => store.user); // Get user info (to check if they're logged in)

//   const navigate = useNavigate();
//   console.log(user)

//   const handlePayment = async () => {
//     try {
//       // 1. Create a payment intent on the backend
//       const response = await axios.post(BASE_URL + "/payment/createpaymentintent", { userId:user._id }, { withCredentials: true });

//       const { clientSecret } = response.data;
//       // console.log(clientSecret)

//       // 2. Use Stripe.js to handle the client-side payment submission
//       const stripe = window.Stripe("pk_test_51QaGutLODVM2Ouss9lYPOJlOzA7IEDUY0f3krhe4VixD4EVilcJ2ybW07KdaDSsM8ZbFl5jJFPQeGn33Gvk1FOh900pYl6mZjv");
//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (error) {
//         setPaymentError(error.message);
//       } else if (paymentIntent.status === "succeeded") {
//         setPaymentSuccess("Payment was successful!");
//         // Optionally redirect after payment success
//         setTimeout(() => {
//           navigate("/profile"); // Example redirect to profile page
//         }, 2000);
//       }
//     } catch (err) {
//       console.error(err);
//       setPaymentError("Payment failed. Please try again later.");
//     }
//   };

//   return (
//     <div>
//       <h1 className="font-bold text-3xl">Payment Page</h1>
//       <p className='text-center'>(Free trial is for 7 days) </p>
//       <p className='text-center '>Click on the Pay Button for continue using the app/Ignore if already paid</p>
      
//       <div className="bg-white">
//         {/* Optionally, add Stripe Elements here */}
//         <CardElement />
        
//         <button className="btn btn-primary" onClick={handlePayment}>
//           Pay Now
//         </button>
//       </div>

//       {paymentError && <div className="text-red-500">{paymentError}</div>}
//       {paymentSuccess && <div className="text-green-500">{paymentSuccess}</div>}
//     </div>
//   );
// };

// export default Payment;


import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Payment = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const stripe = useStripe(); // Initialize Stripe
  const elements = useElements(); // Initialize Elements
  const user = useSelector((store) => store.user); // Get user info
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // 1. Create a payment intent on the backend
      const response = await axios.post(
        BASE_URL + "/payment/createpaymentintent",
        { userId: user._id },
        { withCredentials: true }
      );

      const { clientSecret } = response.data;

      if (!stripe || !elements) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      // 2. Confirm card payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setPaymentError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        setPaymentSuccess("Payment was successful!");
        // Optionally redirect after payment success
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setPaymentError("Payment failed. Please try again later.");
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Payment Page</h1>
      <p className="text-center">(Free trial is for 7 days)</p>
      <p className="text-center">
        Click on the Pay Button to continue using the app/Ignore if already paid
      </p>

      <div className="bg-white">
        {/* Stripe Card Element */}
        <CardElement />
        <button className="btn btn-primary" onClick={handlePayment}>
          Pay Now
        </button>
      </div>

      {paymentError && <div className="text-red-500">{paymentError}</div>}
      {paymentSuccess && <div className="text-green-500">{paymentSuccess}</div>}
    </div>
  );
};

export default Payment;


