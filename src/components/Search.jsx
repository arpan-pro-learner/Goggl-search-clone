import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { useResultsContext } from "../Contexts/ResultsContextProvider";
import { Links } from "./Links";

export default function Search() {
  const [text, setText] = useState("");
  const { setSearchTerm } = useResultsContext();
  const [debouncedValue] = useDebounce(text, 500);

  // console.log(debouncedValue);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:mt-10 mt-3">
      <input
        type="text"
        value={text}
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        placeholder="Search Here or type URL"
        onChange={(e) => setText(e.target.value)}
      />
      {text !== "" && (
        <button
          type="button"
          className="relative right-8 top-1.2 text-l text-gray-500"
          onClick={() => setText("")}
        >
          ❌
        </button>
      )}
      <Links />
    </div>
  );
}
