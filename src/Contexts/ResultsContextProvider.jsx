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
  
    if (pathname === "/search") {
      url = `api/Search/WebSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=20&autoCorrect=true`;
    } else if (pathname === "/images") {
      url = `api/Search/ImageSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=40&autoCorrect=true&safeSearch=true`;
    } else if (pathname === "/news") {
      url = `api/search/NewsSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=15&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`;
    } 
  
    if (url) {
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
    }
    
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
