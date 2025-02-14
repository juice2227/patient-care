import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    // Call your Firebase Function to create a PaymentIntent
    const response = await fetch(
      "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/createStripePaymentIntent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1000, currency: "usd" }), // Amount in smallest unit (1000 = $10)
      }
    );

    const { clientSecret } = await response.json();
    if (!clientSecret) {
      setError("Failed to get client secret");
      setProcessing(false);
      return;
    }

    // Confirm card payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      setSuccess(true);
      setError(null);
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing}>
        {processing ? "Processing..." : "Pay"}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;
