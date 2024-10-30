# Project Title

## Description

A brief description of your project, its purpose, and what problem it solves.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bhusalSachin/movies.git
   cd movies
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Run the development server:
   ```bash
   npm start
   ```
2. Open your browser and go to `http://localhost:3000`

## Components

### MoviesList

The `MoviesList` component is responsible for displaying a list of movies. It fetches movie data using the `useMovies` hook and renders individual `MovieCard` components for each movie.

- **Usage Example:**
  ```tsx
  <MoviesList />
  ```

### MovieCard

The `MovieCard` component represents an individual movie in the movie list. It displays key information about the movie, such as its name, genre, release year, and an image. Additionally, it provides buttons for editing and deleting the movie.

#### Props

- **`id`** (number): The unique identifier of the movie.
- **`name`** (string): The name of the movie.
- **`genre`** (string): The genre of the movie.
- **`year`** (number): The release year of the movie.
- **`imageUrl`** (string): The URL of the movie's image.
- **`handleOpenModal`** (Function): A callback function that is called when the edit button is clicked. This function should open a modal for editing the movie details.
- **`handleDeleteMovie`** (Function): A callback function that is called when the delete button is clicked. This function should handle the deletion of the movie.

#### Usage Example

Here is an example of how to use the `MovieCard` component:

```tsx
<MovieCard
  id={movie.id}
  name={movie.name}
  genre={movie.genre}
  year={movie.year}
  imageUrl={movie.imageUrl}
  handleOpenModal={handleOpenModal}
  handleDeleteMovie={handleDeleteMovie}
/>
```

#### Features

- **Dynamic Rendering**: The `MovieCard` component dynamically displays the movie details based on the props passed to it. This allows for a flexible representation of any movie data.

- **Edit and Delete Functionality**:

  - The component includes an **Edit** button that, when clicked, invokes the `handleOpenModal` function to open a modal for editing the movie details.
  - The **Delete** button allows users to remove a movie from the list by calling the `handleDeleteMovie` function with the movie's ID.

- **Responsive Design**: Designed using Tailwind CSS, the `MovieCard` adjusts its layout for various screen sizes, ensuring that the component is visually appealing and user-friendly across devices.

- **Hover Effects**: The card features subtle hover effects, enhancing user experience by providing visual feedback when users interact with the movie card.

- **Information Display**: The component displays essential movie information clearly, including:

  - Movie name, with the option to display the release year as a badge.
  - Genre, displayed as an outline badge for easy identification.

- **Image Display**: The `MovieCard` shows the movie's image prominently, allowing users to visually identify each movie quickly.

- **Modular Design**: The component is modular and reusable, making it easy to integrate into various parts of the application without significant changes.
