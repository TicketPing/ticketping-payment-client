import {useState} from "react";
export default function Modal({modal, setPerformanceId, setOrderId}) {
    const {setIsModalOpen, setClientSecret, setDpmCheckerLink} = modal;
    const [performanceId, setPerformance] = useState("")
    const [orderId, setOrder] = useState("")
    const handleModalSubmit = () => {
        console.log(performanceId);
        console.log(orderId);
        if (!performanceId) {
            console.error("performanceId가 설정되지 않았습니다.");
        }
        if (!orderId) {
            console.error("orderId가 설정되지 않았습니다.");
            return; // orderId가 없으면 요청을 보내지 않음
        }
        //fetch(`http://3.36.73.221:10020/api/v1/payments/${orderId}`, {
        //fetch(`http://localhost:8080/api/v1/payments/${orderId}`, {
        fetch(`https://1741-122-203-225-229.ngrok-free.app/api/v1/payments/${orderId}?performanceId=${encodeURIComponent(performanceId)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setIsModalOpen(false);
                setClientSecret(data.data.clientSecret);
                setDpmCheckerLink(data.data.dpmCheckerLink);
                setPerformanceId(performanceId);
                setOrderId(orderId);
            });
    };
    return <>
        <div className="modal">
            <div className="modal-content">
                <h2>공연 ID 입력</h2>
                <input
                    type="text"
                    placeholder= "performance ID를 입력하세요"
                    // faec94ca-8583-4380-b0b5-6c6458abb220
                    value={performanceId}
                    onChange={(e) => setPerformance(e.target.value)}
                    className="custom-input"
                />
                <h2>상품 ID 입력</h2>
                <input
                    type="text"
                    placeholder="order ID를 입력하세요"
                    // faec94ca-8583-4380-b0b5-6c6458abb220
                    value={orderId}
                    onChange={(e) => setOrder(e.target.value)}
                    className="custom-input"
                />
                <br></br>
                <button onClick={handleModalSubmit}>확인</button>
            </div>
        </div>
    </>
}







