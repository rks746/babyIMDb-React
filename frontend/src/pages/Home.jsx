import { useState, useEffect } from "react";
import { getMovies, searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const defaultMovies = await getMovies("action");
        setMovies(defaultMovies);
      } catch (err) {
        setError("Failed to load default movies.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies.....");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>

        {searchQuery && (
          <button
            type="button"
            className="clear-button"
            onClick={() => setSearchQuery("")}
          >
            ✕
          </button>
        )}
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {!loading && movies.length === 0 && <div>No movies found.</div>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.imdbID} />
        ))}
      </div>
    </div>
  );
}

export default Home;
