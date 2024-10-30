// src/hooks/useMovies.ts
// Custom hook to fetch movie data from an API

import { useEffect, useState } from 'react';
import axios from 'axios';
import { UseMoviesResponse } from './types'; // Importing the type for the response
import { Movie } from '../components/MoviesList/types'; // Importing the Movie type

/**
 * Custom hook for fetching movies with pagination.
 *
 * @param page - The current page number for pagination.
 * @param limit - The number of movies to fetch per page.
 * @returns An object containing movies, loading state, and error information.
 */
const useMovies = (page: number, limit: number): UseMoviesResponse => {
    const [movies, setMovies] = useState<Movie[]>([]); // State to store movies
    const [loading, setLoading] = useState<boolean>(true); // State to track loading status
    const [error, setError] = useState<string | null>(null); // State to store error messages

    const baseUrl = "http://localhost:3000"; // Base URL for the API

    useEffect(() => {
        // Function to fetch movies from the API
        const fetchMovies = async () => {
            try {
                setLoading(true); // Set loading state to true before fetching
                const response = await axios.get(`${baseUrl}/movies?page=${page}&limit=${limit}`); // API call
                setMovies(response.data.movies); // Set movies from the response
            } catch (err: any) {
                console.log(err); // Log the error
                setError(err.message || 'An error occurred while fetching movies.'); // Set error message
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchMovies(); // Invoke the fetch function
    }, [page, limit]); // Dependencies: re-fetch when page or limit changes

    return { movies, loading, error }; // Return the movies, loading state, and error
};

export default useMovies; // Export the custom hook
