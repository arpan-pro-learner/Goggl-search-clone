import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useResultsContext } from "../Contexts/ResultsContextProvider";
import Loading from "./Loading";

export default function AllResults() {
  const { results, isLoading, getResults, searchTerm } = useResultsContext();
 const location = useLocation();
  useEffect(() => {
    if (searchTerm !== "" ) {
      getResults("web", searchTerm);
    }
  }, [searchTerm, location.pathname]);

 
  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
      {results?.value?.map(({ url, title, description }, index) => (
        <div key={index} className="md:w-2/5 w-full">
          <a href={url} target="_blank" rel="noreferrer">
            <p className="text-md pb-2">
              {url.length > 30 && url !== "" ? url.substring(0, 30) : url}
            </p>
            <p className="text-2xl hover:underline dark:text-blue-300 text-blue-700">
              {title}
            </p>
            <p>
              {description.length > 10 && description !== ""
                ? description.substring(0, 200)
                : description}
            </p>
          </a>
        </div>
      ))}
    </div>
  );
}
