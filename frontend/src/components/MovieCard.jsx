import { useMovieContext } from "../contexts/MovieContexts";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const fav = isFavorite(movie.imdbID);

  const toggleFavorite = () => {
    if (fav) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
        alt={movie.Title}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <button
          className={`heart-btn ${fav ? "active" : ""}`}
          onClick={toggleFavorite}
        >
          {fav ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
