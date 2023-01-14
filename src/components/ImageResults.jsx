import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useResultsContext } from "../Contexts/ResultsContextProvider";
import Loading from "./Loading";

export default function ImageResults() {
  const { results, isLoading, getResults, searchTerm } = useResultsContext();
  const location = useLocation();
  
  useEffect(() => {
    if (searchTerm !== "" && searchTerm !== undefined) {
      getResults('image', searchTerm);
    }
  }, [location.pathname, searchTerm]);

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-4 gap-4 sm:grid grid-cols-2 gap-1">
      {results?.value?.map(({ url, title }, index) => (
        <a
          href={url}
          target="_blank"
          key={index}
          rel="noreferrer"
          className="sm:p-3 p-5"
        >
          <img src={url} alt={title} loading="lazy" />
          <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
        </a>
      ))}
    </div>
  );
}
