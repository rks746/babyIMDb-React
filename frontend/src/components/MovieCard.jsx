import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContexts"; 

function MovieCard({ movie }) {

  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favourite = isFavorite(movie.imdbID);

  function onFavoriteClick(e) {
    //alert(`Favorited: ${movie.Title}`);
    e.preventDefault();
    if (favourite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie.Title);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"} // optional fallback
          alt={movie.Title}
        />
        <div className="movie-overlay">
          <button className={`favorite-btn ${favourite ? "active" : ""}`} onClick={onFavoriteClick}>
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
