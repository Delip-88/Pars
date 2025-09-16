import React, { createContext, useContext } from "react";

// Create the context
const ApiContext = createContext();

// Create a provider component
export const ApiProvider = ({ children }) => {
  const API_BASE_URL =
    import.meta.env.VITE_MODE === "development"
      ? "http://localhost:4000"
      : import.meta.env.VITE_SERVER_URL;

  return (
    <ApiContext.Provider value={{ API_BASE_URL }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook for easier usage
export const useApi = () => useContext(ApiContext);
