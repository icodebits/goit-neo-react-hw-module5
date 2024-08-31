import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

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
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWFhOTMzZWIzYzY0OTcxZmZjNTg4YjU0ZWQzODBlMSIsIm5iZiI6MTcyNTEwNDgzNy45NjIwMDMsInN1YiI6IjY2ZDMwMjI2NDhkM2FhNTAwMDliYTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p2lSdyugt6H_1aX5ky1eE3xu9s_Gqtgkoq6MKdEsOuk",
              },
            }
          );
          setMovies(response.data.results);
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
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} from={location} query={query} />
    </div>
  );
}

export default MoviesPage;
