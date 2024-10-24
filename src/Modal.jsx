import {useContext, useState} from "react";
import PerformanceContext from "./PerformanceContext";

export default function Modal({modal, setPerformanceId, setOrderId}) {
    const {setIsModalOpen, setClientSecret, setDpmCheckerLink} = modal;
    const { SavePerformanceId, SaveToken } = useContext(PerformanceContext);
    const [performanceId, setPerformance] = useState("")
    const [orderId, setOrder] = useState("")
    const [token, setToken] = useState("");
    const handleModalSubmit = () => {
        console.log(performanceId);
        console.log(orderId);
        console.log("token : " + token);
        if (!performanceId) {
            console.error("performanceId가 설정되지 않았습니다.");
        }
        if (!orderId) {
            console.error("orderId가 설정되지 않았습니다.");
            return; // orderId가 없으면 요청을 보내지 않음
        }
        if (!token) {
            console.error("token이 설정되지 않았습니다.");
            return;
        }
        //fetch(`http://3.36.73.221:10020/api/v1/payments/${orderId}`, {
        //fetch(`http://localhost:8080/api/v1/payments/${orderId}`, {
        fetch(`http://3.35.217.241:10024/api/v1/payments/${orderId}?performanceId=${encodeURIComponent(performanceId)}`, {
            method: "POST",
            //mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setIsModalOpen(false);
                setClientSecret(data.data.clientSecret);
                setDpmCheckerLink(data.data.dpmCheckerLink);
                setPerformanceId(performanceId);
                setOrderId(orderId);

            })
            .then(() => {
                SavePerformanceId(performanceId)
                SaveToken(token);
                }
            );
    };
    return <>
        <div className="modal">
            <div className="modal-content">
                <h2>공연 ID 입력</h2>
                <input
                    type="text"
                    placeholder="performance ID를 입력하세요"
                    // faec94ca-8583-4380-b0b5-6c6458abb220
                    value={performanceId}
                    onChange={(e) => setPerformance(e.target.value)}
                    className="custom-input"
                />
                <h2>예매 ID 입력</h2>
                <input
                    type="text"
                    placeholder="order ID를 입력하세요"
                    // faec94ca-8583-4380-b0b5-6c6458abb220
                    value={orderId}
                    onChange={(e) => setOrder(e.target.value)}
                    className="custom-input"
                />
                <h2>JWT Token 입력</h2>
                <input
                    type="text"
                    placeholder="jwt Token을 Bearer 를 제외하고 입력하세요"
                    // faec94ca-8583-4380-b0b5-6c6458abb220
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="custom-input"
                />
                <br></br>
                <button onClick={handleModalSubmit}>확인</button>
            </div>
        </div>
    </>
}







