// import React, { createContext, useContext, useState } from "react";
//
// const PerformanceContext = createContext();
//
// export const usePerformance = () => useContext(PerformanceContext);
//
// export const PerformanceProvider = ({ children }) => {
//     const [performanceId, setPerformanceId] = useState(null);
//     const [orderId, setOrderId] = useState(null);
//
//     return (
//         <PerformanceContext.Provider value={{ performanceId, setPerformanceId, orderId, setOrderId }}>
//             {children}
//         </PerformanceContext.Provider>
//     );
// };
import { createContext } from "react";

const PerformanceContext = createContext();

export default PerformanceContext;