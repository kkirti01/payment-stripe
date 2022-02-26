import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import StripeCheckout from "react-stripe-checkout";
// import StripeCheckout from '@stripe/react-stripe-js'


function App() {

  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "Facebook"
  })


  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log("RESPONSE", response);
      const { status } = response;
      console.log("STATUS", status);
    })
      .catch(error => console.log(error));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          // stripeKey={process.env.REACT_APP_KEY}
          stripeKey="pk_test_51J9VuJSDQpXJGM5BqzorOcThw0tFFxQfTMmBn2Zy6fzKFCH1WVaYpbJApEz0UuUgKAJieAv3nyFCnWlKSk2I1ikB00GDsbU22q"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}>
          <button className="btn-large red">Buy React in just ${product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
