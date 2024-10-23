import React, {useEffect, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import CompletePage from "./CompletePage";
import Modal from "./Modal";
import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PerformanceProvider from "./PerformanceProvider";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51Q801tRpxgEVE539pBARC3D84A8MPZskWP4cyVuXZZOWGDVFmD2YF7pfZArK7jYymrTSZ4aGE2hlxKe0LLUUaHrI00NC71Qgaz");
export default function App() {
    const [orderId, setOrderId] = useState("");
    const [performanceId, setPerformanceId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [pid, setPid] = useState("");
    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';
    const path = window.location.pathname;

    useEffect(() => {
        if (path === '/complete') {
            const search = window.location.search
            setIsModalOpen(false)
            setClientSecret(new URLSearchParams(search).get('payment_intent_client_secret'))
            setPid(new URLSearchParams(search).get('payment_intent'));
        }
    }, []);
    return (
        <PerformanceProvider>
        <Router>
            <div className="App">
                {isModalOpen && <Modal modal={{setIsModalOpen, setClientSecret, setDpmCheckerLink}} setPerformanceId={setPerformanceId} setOrderId={setOrderId}/> }
                {clientSecret && (
                    <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                        <Routes>
                            <Route path="/" element={<CheckoutForm dpmCheckerLink={dpmCheckerLink} performanceId={performanceId} orderId={orderId} />}/>
                            <Route path="/complete" element={<CompletePage pid={pid} performanceId={performanceId} />}/>
                        </Routes>
                    </Elements>
                )}
            </div>
        </Router>
        </PerformanceProvider>
    )
}