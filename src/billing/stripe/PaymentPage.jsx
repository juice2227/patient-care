// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // This will be your form component

const stripePromise = loadStripe("pk_test_51Qr6qmE8xW3O8ZuAOsVForwh58pVTAjSVAJfftXpEhoIiNSxb9FZAlJ4EBGo90uhDTcZtRj6EUlXkECtjwgfjwgg00WSbZf2FJ");

function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default PaymentPage;
