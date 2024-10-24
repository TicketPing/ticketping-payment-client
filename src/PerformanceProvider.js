import React, { useState, useEffect } from "react";
import PerformanceContext from "./PerformanceContext";

const PerformanceProvider = ({ children}) => {
    const [performanceId, setPerformanceId] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
       setPerformanceId(localStorage.getItem("performanceId"))
        setToken(localStorage.getItem("token"))
    }, []);

    const SaveToken = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    }

    const RemoveToken = (token) => {
        setToken(null);
        localStorage.removeItem("token");
    }

    const SavePerformanceId = (performId) => {
        setPerformanceId(performId);
        localStorage.setItem("performanceId", performId);
    };

    //remove
    const Remove = () => {
        setPerformanceId(null);

        localStorage.removeItem("performanceId")
    };

    return (
        <PerformanceContext.Provider
            value={{
                performanceId,
                SavePerformanceId,
                Remove,
                setPerformanceId,
                token,
                SaveToken,
                RemoveToken,
                setToken
            }}
            >
            {children}
        </PerformanceContext.Provider>
    );
};

export default PerformanceProvider;