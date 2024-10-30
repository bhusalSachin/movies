// MoviesList.tsx
// This component displays a list of movies, allows users to add, edit, and delete movies,
// and supports infinite scrolling to load more movies as the user scrolls down.

import React, { useEffect, useState } from "react";
import useMovies from "../../hooks/useMovies";
import MovieCard from "./Movie";
import MovieForm from "./MovieForm";
import axios from "axios";
import { Movie } from "./types";

const MoviesList: React.FC = () => {
  // State for managing pagination and movie list
  const [apiPage, setApiPage] = useState(1);
  const [limit] = useState(15);
  const [isLastPage, setIsLastPage] = useState(false);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  const { movies, loading, error } = useMovies(apiPage, limit);

  // Effect for updating the movie list when new movies are fetched
  useEffect(() => {
    if (movies.length > 0) {
      setAllMovies((prevMovies) => {
        const existingIds = new Set(prevMovies.map((movie) => movie.id));
        const newMovies = movies.filter((movie) => !existingIds.has(movie.id));
        return [...prevMovies, ...newMovies];
      });
    }
    setIsLastPage(movies.length < limit);
  }, [movies]);

  // Function to handle scroll events for infinite scrolling
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollY + windowHeight >= documentHeight - 100 && !isLastPage) {
      setApiPage((prevPage) => prevPage + 1);
    }
  };

  // Effect to add/remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLastPage]);

  // Function to handle adding a new movie
  const handleAddMovie = async (movie: Omit<Movie, "id">) => {
    try {
      const response = await axios.post("http://localhost:3000/movies", movie);
      setAllMovies((prevMovies) => [...prevMovies, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle editing an existing movie
  const handleEditMovie = async (movie: Omit<Movie, "id">) => {
    if (editingMovie) {
      try {
        const response = await axios.put(
          `http://localhost:3000/movies/${editingMovie.id}`,
          movie
        );
        setAllMovies((prevMovies) =>
          prevMovies.map((m) => (m.id === editingMovie.id ? response.data : m))
        );
        setEditingMovie(null);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Function to handle deleting a movie
  const handleDeleteMovie = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/movies/${id}`);
      setAllMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Function to open the movie modal for adding/editing
  const handleOpenModal = (movie?: Movie) => {
    setEditingMovie(movie || null);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      <button
        onClick={() => handleOpenModal()}
        className="ml-12 my-8 btn btn-sm btn-primary">
        Add Movie
      </button>
      <ul className="flex flex-wrap gap-4 items-center justify-center">
        {allMovies.map((movie) => (
          <div key={movie.id}>
            <MovieCard
              id={movie.id}
              imageUrl={movie.imageUrl}
              name={movie.name}
              genre={movie.genre}
              year={movie.year}
              handleOpenModal={handleOpenModal}
              handleDeleteMovie={handleDeleteMovie}
            />
          </div>
        ))}
      </ul>

      {loading && !error && (
        <progress className="progress progress-info w-56"></progress>
      )}

      {error && (
        <div className="text-red-500 mt-4">
          An error occurred. Please try again.
        </div>
      )}

      <MovieForm
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSubmit={editingMovie ? handleEditMovie : handleAddMovie}
        initialData={editingMovie || undefined}
      />
    </div>
  );
};

export default MoviesList;
