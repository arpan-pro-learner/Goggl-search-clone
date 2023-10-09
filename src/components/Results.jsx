import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResultsContext } from "../Contexts/ResultsContextProvider";
import Loading from "./Loading";

export default function Results() {
  const { results, isLoading, searchTerm, getResults, setResults } = useResultsContext();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      if (searchTerm !== "") {
        
        setResults(null);

   
        await getResults(location.pathname, searchTerm);

  
      }
    };

    fetchData();
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  // Remove the "No results found" message when no search is performed
  if (!searchTerm) {
    return null;
  }

  // Check if there are results in the data
  if (!results || !results.results || results.results.length === 0) {
    return <p>No results found</p>;
  }

  // console.log("In Results", location.pathname, searchTerm, results);
  return (
    <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:px-56">
  
    

      {/* Display Search Results */}
      <div className="md:w-3/5 w-full">
        {results.results.map((result, index) => (
          <div key={index} className="mb-6">
            <a href={result.url} target="_blank" rel="noreferrer">
              <h2 className="text-xl font-semibold hover:underline text-blue-700 dark:text-blue-300">
                {result.title}
              </h2>
              <p className="text-black-400  dark:text-gray-300">{result.description}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
