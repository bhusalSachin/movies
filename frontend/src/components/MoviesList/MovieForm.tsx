// MovieForm.tsx
// This component renders a modal form for adding or editing movie details.
// It includes fields for movie name, genre, release year, and image URL.
// The form submission is handled by a function passed as a prop, and it can also reset fields when editing an existing movie.

import React, { useState, useEffect } from "react";
import { Movie } from "./types";

interface MovieFormProps {
  isOpen: boolean; // Indicates whether the modal is open
  onRequestClose: () => void; // Function to close the modal
  onSubmit: (movie: Omit<Movie, "id">) => void; // Function to handle form submission
  initialData?: Omit<Movie, "id">; // Optional initial data for editing a movie
}

const MovieForm: React.FC<MovieFormProps> = ({
  isOpen,
  onRequestClose,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState(""); // State for movie name
  const [genre, setGenre] = useState(""); // State for movie genre
  const [year, setYear] = useState(""); // State for movie release year
  const [imageUrl, setImageUrl] = useState(""); // State for movie image URL

  console.log("inside movie form, isOpen = ", isOpen, initialData);

  useEffect(() => {
    // Effect to set initial form values when editing a movie
    if (initialData) {
      setName(initialData.name);
      setGenre(initialData.genre);
      setYear(initialData.year.toString());
      setImageUrl(initialData.imageUrl || ""); // Set imageUrl if available
    } else {
      // Reset form fields when adding a new movie
      setName("");
      setGenre("");
      setYear("");
      setImageUrl(""); // Reset imageUrl
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Construct the movie object for submission
    const movie = { name, genre, year: parseInt(year), imageUrl };
    onSubmit(movie); // Call the submission handler
    onRequestClose(); // Close the modal after submission
  };

  if (!isOpen) return null; // Return null if modal is not open

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
      <div
        className={`fixed inset-0 flex items-center justify-center ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <h2>{initialData ? "Edit Movie" : "Add Movie"}</h2>
            {/* Input field for Movie Name */}
            <label className="focus:outline-none focus-within:outline-none input input-bordered flex items-center gap-2 text-sm">
              Movie Name
              <input
                type="text"
                value={name}
                className="grow"
                placeholder="...."
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            {/* Input field for Movie Genre */}
            <label className="focus:outline-none focus-within:outline-none input input-bordered flex items-center gap-2 text-sm">
              Movie Genre
              <input
                type="text"
                placeholder="...."
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </label>
            {/* Input field for Released Year */}
            <label className="focus:outline-none focus-within:outline-none input input-bordered flex items-center gap-2 text-sm">
              Released Year
              <input
                type="number"
                placeholder="...."
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </label>
            {/* Input field for Image URL */}
            <label className="focus:outline-none focus-within:outline-none input input-bordered flex items-center gap-2 text-sm">
              Image Url
              <input
                type="text"
                placeholder="...."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </label>
            <button
              className="btn-xs btn btn-outline btn-success"
              type="submit">
              Submit
            </button>
            <button
              className="btn btn-xs btn-outline btn-error"
              type="button"
              onClick={onRequestClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
