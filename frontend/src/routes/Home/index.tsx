// src/pages/Home.tsx
// Home component that serves as the main page for displaying a list of movies.

import React from "react"; // Importing React
import MoviesList from "../../components/MoviesList"; // Importing the MoviesList component

/**
 * Home component that renders the MoviesList.
 *
 * @returns A JSX element that contains the MoviesList component.
 */
function Home() {
  return (
    <div className="">
      {/* Render the MoviesList component */}
      <MoviesList />
    </div>
  );
}

export default Home; // Export the Home component
