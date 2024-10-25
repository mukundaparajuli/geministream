import React from "react";
import Authentication from "./Authentication";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import MovieInfo from "./MovieInfo";

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
  ]);

  return (
    <div className="no-scrollbar bg-black h-auto overflow-hidden">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
