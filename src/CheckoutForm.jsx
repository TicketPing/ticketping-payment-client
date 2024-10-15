import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import axios from "axios";

import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({dpmCheckerLink, orderId}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // useNavigate 훅 사용

  //서버로 주문 검증 요청을 보내는 함수
  const verifyOrder = async () => {
    try {
      const response = await axios.post
      (`http://3.36.73.221:10020/api/v1/payments/verify-ttl/${orderId}`
      //(`http://localhost:8080/api/v1/payments/verify-ttl/${orderId}`
      //     , {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   }
      // }
      )
      console.log(response.status);
      return true;
      // .then((res) => {
      //   console.log(res.status);
      //   // 응답 상태 코드가 200-299 범위에 있을 때만 처리
      //   if (res.ok) {
      //     return res.json(); // 응답 데이터를 JSON으로 파싱
      //   } else {
      //     // 상태 코드가 성공적이지 않은 경우 처리
      //     throw new Error(`서버 응답 오류: ${res.status}`);
      //   }
      // })
    } catch (error) {
      console.error("서버 검증 중 오류 발생:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // 주문 검증 실행
    const isValid = await verifyOrder();
    if (!isValid) {
      setMessage("주문 검증 실패: ttl이 만료되었습니다. 처음부터 다시 시도해주세요.");
      setIsLoading(false);

      // 검증 실패 시 5초 후 홈으로 리다이렉트
      setTimeout(() => {
        navigate("/complete"); // 상태 전달
      }, 3000); // 3000ms = 3초

      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/complete`,
      },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
      {dpmCheckerLink &&
          <>

            <form id="payment-form" onSubmit={handleSubmit}>
              <PaymentElement id="payment-element" options={paymentElementOptions}/>
              <button disabled={isLoading || !stripe || !elements || !orderId} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </form>
            {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
            <div id="dpm-annotation">
              <p>
                Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
                <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview
                  payment methods by transaction</a>
              </p>
            </div>
          </>
      }
    </>
  );
}