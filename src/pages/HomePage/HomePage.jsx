import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
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

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Trending Today</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
