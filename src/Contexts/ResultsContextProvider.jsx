
import React, { useContext, createContext, useState } from "react";

const ResultContext = createContext();

const baseUrl = "https://web-search24.p.rapidapi.com/";

export const ResultsContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Implement your getResults function here, making sure to set the results and isLoading state
  const getResults = async (pathname, searchTerm) => {
    setIsLoading(true);
  
    try {
      const url = `?query=${searchTerm}&limit=20`;
  
      const response = await fetch(`${baseUrl}${url}`, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "7bc5b770efmsh6a6ab0531c64ec2p1faa08jsne16a7e08ba33",
          "X-RapidAPI-Host": "web-search24.p.rapidapi.com",
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        // Handle error here
        console.error("Error fetching data");
      }
    } catch (error) {
      // Handle fetch error here
      console.error("Fetch error:", error);
    }
  
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{
        results,
        searchTerm,
        setSearchTerm,
        isLoading,
        setResults,
        getResults,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultsContext = () => useContext(ResultContext);
