import {useState} from "react";

export default function Modal({modal}) {
    const {setIsModalOpen, setClientSecret, setDpmCheckerLink} = modal;
    const [order, setOrder] = useState("")
    const handleModalSubmit = () => {
        fetch(`http://localhost:8080/api/v1/payments/faec94ca-8583-4380-b0b5-6c6458abb220`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((data) => {
                setIsModalOpen(false);
                setClientSecret(data.data.clientSecret);
                setDpmCheckerLink(data.data.dpmCheckerLink);
            });
    };


    return <>
        <div className="modal">
            <div className="modal-content">
                <h2>상품 ID 입력</h2>
                <input
                    type="text"
                    placeholder="상품 ID를 입력하세요"
                    // faec94ca-8583-4380-b0b5-6c6458abb220
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="custom-input"
                />
                <br></br>
                <button onClick={handleModalSubmit}>확인</button>
            </div>
        </div>
    </>
}