import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../apiService";
import styles from "./MoviesPage.module.css";

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.query.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    }
  };

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const results = await searchMovies(query);
          setMovies(results);
        } catch (error) {
          console.error(error);
        }
      };

      fetchMovies();
    }
  }, [query]);

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Enter movie title"
          className={styles.input}
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} from={location} query={query} />
    </div>
  );
}

export default MoviesPage;
