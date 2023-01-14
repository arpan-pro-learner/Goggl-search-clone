import React, { useContext, createContext, useState } from "react";


const ResultContext = createContext();
const baseUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/";

export const ResultsContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = async (pathname, searchTerm) => {
    console.log("In Context", pathname, searchTerm);
    setIsLoading(true);

    let url;

    if (pathname === "/search" && pathname !== undefined) {
      url = `api/Search/WebSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`;
    } else if (pathname === "/images"  && pathname !== undefined) {
      url = `api/Search/ImageSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=40&autoCorrect=true&safeSearch=true`;
    }

    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    });
    const data = await response.json();

    console.log(data);
    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{
        getResults,
        results,
        searchTerm,
        setSearchTerm,
        isLoading,
        setResults,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultsContext = () => useContext(ResultContext);
