import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import Grid from '@mui/material/Grid';
import { useLocation } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";
import der from "./Appp.css";
import { textAlign } from "@mui/material/node_modules/@mui/system";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// To avoid exposing it, don't submit any personally identifiable information through requests with this API key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51K8tbEFK05i5y2oRylgHkKJzaWXhhRVsLXaaQxPqaaFQKdAZoLbKWrA4iD7F9yzvMu0ag8BIdHTgAWeifKZVdVbO00NBJFKuXF");




export default function Pay() {
  const [clientSecret, setClientSecret] = useState("");
  const { state } = useLocation();
 const {money} = state;
  

  useEffect(() => {

    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/users/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ money:money }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  

 

  return (
    
    <Grid container spacing={2} justify="center" class="wrapper">

    <div className="rer" id="foog" align="center">
      
 
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  
    </div>
    </Grid>
  );
}