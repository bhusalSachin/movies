// MovieCard.tsx
// This component renders a card displaying movie details such as name, genre, year, and image.
// It also provides buttons to edit or delete the movie, triggering appropriate handlers passed as props.

import { Movie, MovieCardProps } from "./types";

const MovieCard: React.FC<MovieCardProps> = (props) => {
  const {
    id,
    name,
    genre,
    year,
    imageUrl,
    handleOpenModal,
    handleDeleteMovie,
  } = props;

  const movie = { id, name, genre, year, imageUrl };

  return (
    <div className="card bg-base-100 w-96 shadow-xl cursor-pointer hover:shadow-lg transform transition-all duration-500">
      <figure>
        <img className="w-72 h-72" src={imageUrl} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          {year && <div className="badge badge-secondary">{year}</div>}
        </h2>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{genre}</div>
        </div>
      </div>
      <div className="flex w-full justify-between p-4">
        {/* Button to edit the movie, opens the modal with movie details */}
        <button
          className="btn btn-sm btn-info"
          onClick={() => handleOpenModal(movie)}>
          Edit
        </button>
        {/* Button to delete the movie, invokes the delete handler with movie ID */}
        <button
          className="btn btn-sm btn-error"
          onClick={() => handleDeleteMovie(movie.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
