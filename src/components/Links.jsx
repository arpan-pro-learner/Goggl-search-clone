import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { url: "/search", text: "🔎 All" },
  { url: "/images", text: "📸 Images" },
  { url: "/news", text: "📃 News" },
];

export const Links = () => {
  return (
    <div className="flex  sm: items-left mt-4">
      {links.map(({ url, text }) => (
        <NavLink
          to={url}
          className="m-4 p-2 text-blue-700 border-blue-700 dark:text-blue-300  pb-4 focus:border-b-2"
        >
          {text}
        </NavLink>
      ))}
    </div>
  );
};
