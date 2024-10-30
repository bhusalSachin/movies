// types.ts
// This file contains TypeScript interfaces that define the structure of data used in the movie application.

export interface Movie {
  id: number;         // Unique identifier for the movie
  name: string;       // Title of the movie
  genre: string;      // Genre of the movie (e.g., Action, Comedy, Drama)
  year: number;       // Release year of the movie
  imageUrl: string;   // URL of the movie's poster or image
}

export interface MovieCardProps extends Movie {
  handleOpenModal: Function;     // Function to handle opening the movie edit modal
  handleDeleteMovie: Function;    // Function to handle deleting the movie
}

// PaginationPropType is used to manage pagination state.
export interface PaginationPropType {
  page: number;                  // Current page number in pagination
  setPage: Function;             // Function to update the current page number
}

// MovieFormProps defines the properties for the MovieForm component.
export interface MovieFormProps {
  isOpen: boolean;               // Indicates whether the modal form is open
  onRequestClose: () => void;    // Function to close the modal
  onSubmit: (movie: Movie) => void; // Function to handle submission of the movie data
  initialData?: Movie;           // Optional initial data for editing a movie, including the id
}
