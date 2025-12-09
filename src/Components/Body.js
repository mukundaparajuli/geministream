import React from "react";
import Authentication from "./Authentication";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import MovieInfo from "./MovieInfo";
import GptSearch from "./GptSearch";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Authentication />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/browse/:id",
      element: <MovieInfo />,
    },
    {
      path: "/search",
      element: <GptSearch />,
    },
  ]);

  return (
    <div className="no-scrollbar bg-black h-auto overflow-hidden">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
