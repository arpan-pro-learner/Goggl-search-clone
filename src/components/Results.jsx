import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useResultsContext } from "../Contexts/ResultsContextProvider";
import Loading from "./Loading";

export default function Results() {
  const { results, isLoading, getResults, searchTerm } = useResultsContext();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/images") {
        getResults(
          `api/Search/ImageSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=40&autoCorrect=true&safeSearch=true`
        );
      } if(location.pathname === "/search") {
        getResults(
          `api/Search/WebSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`
        );
      }
    }
  }, [searchTerm]);

  const location = useLocation();
  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.value?.map(({ url, title, description }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={url} target="_blank" rel="noreferrer">
                <p className="text-md pb-2">
                  {url.length > 30 ? url.substring(0, 30) : url}
                </p>
                <p className="text-2xl hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <p className="">
                  {description.length > 10
                    ? description.substring(0, 200)
                    : description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="grid grid-cols-4 gap-4 sm:grid grid-cols-2 gap-1">
          {results?.value?.map(
            ({ url , title }, index) => (
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
            )
          )}
        </div>
      );
    case "/news":
      return "search news";
    default:
      break;
  }

  return <div>results</div>;
}
