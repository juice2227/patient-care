const stripe = await loadStripe("YOUR_PUBLISHABLE_KEY");

const createPayment = async () => {
  const response = await fetch("/createPaymentIntent", {
    method: "POST",
    body: JSON.stringify({
      amount: 100, // Example amount in dollars
      currency: "usd",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { clientSecret } = await response.json();

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement, // Card element from Stripe.js
    },
  });

  if (result.error) {
    console.log(result.error.message);
  } else {
    console.log("Payment succeeded!", result.paymentIntent);
  }
};
