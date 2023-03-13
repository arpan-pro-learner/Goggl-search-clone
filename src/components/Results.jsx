import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useResultsContext } from "../Contexts/ResultsContextProvider";

import Loading from "./Loading";

export default function Results() {
  const { results, isLoading, getResults, searchTerm, setResults } =
    useResultsContext();
  const location = useLocation();

  console.log("In Results", location.pathname, searchTerm, results);

  useEffect(() => {
    if (searchTerm !== "") {
      setResults(null);
      (async () => {
        await getResults(location.pathname, searchTerm);
      })();
    }
  }, [location.pathname, searchTerm]);

  if (isLoading) return <Loading />;
  switch (location.pathname) {
    case "/search":
      if (!results) {
        return null; 
      }

      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.value?.map(({ url, title, description }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-md pb-2">
                  {url.length > 30 && url !== null ? url.substring(0, 30) : url}
                </p>
                <p className="text-2xl hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <p>
                  {description &&
                  description.length > 10 &&
                  description !== null
                    ? description.substring(0, 200)
                    : description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      if (!results) {
        return null; 
      }

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
    case "/news":
      if (!results) {
        return null; 
      }

      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.value?.map(({ url, title, description }, index) => (
            <div key={index} className="md:w-3/5 w-full">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-lg pb-2">
                  {url.length > 30 && url !== null ? url.substring(0, 30) : url}
                </p>
                <p className="text-2xl hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    default:
      break;
  }

  return <div>results</div>;
}
