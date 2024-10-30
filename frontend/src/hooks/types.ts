// useMoviesResponse.ts
// This file defines the UseMoviesResponse interface for the response from the useMovies custom hook.

import { Movie } from "../components/MoviesList/types";

// UseMoviesResponse represents the structure of the response from the useMovies hook.
export interface UseMoviesResponse {
    movies: Movie[];           // Array of movies retrieved from the API or data source
    loading: boolean;          // Indicates whether the data is currently being loaded
    error: string | null;      // Error message if there was an issue fetching the data; null if no error occurred
}
