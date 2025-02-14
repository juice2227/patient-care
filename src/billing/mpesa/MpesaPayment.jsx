const MpesaPayment = async () => {
    const response = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/initiateMpesaPayment", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: "254748412779", // User's phone number
        amount: 1000, // Payment amount in KES
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
    console.log(data);
  };
   export default MpesaPayment