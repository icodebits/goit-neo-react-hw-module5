import { useEffect, useState } from "react";
import { useParams, Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../apiService";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import styles from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { query } = location.state || {};

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const goBack = () => {
    if (location.state == null) {
      navigate("/movies");
    } else {
      navigate(query ? `/movies?query=${query}` : "/");
    }
  };

  return (
    <div>
      {movie && (
        <>
          <button onClick={goBack} className={styles.goBackButton}>Go back</button>
          <div className={styles.container}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={styles.poster}
            />
            <div className={styles.details}>
              <h1 className={styles.title}>
                {movie.title} ({movie.release_date.substring(0, 4)})
              </h1>
              <p className={styles.userScore}>
                User Score: {Math.round(movie.vote_average * 10)}%
              </p>
              <div className={styles.overview}>
                <strong>Overview</strong>
                <p>{movie.overview}</p>
              </div>
              <div className={styles.genres}>
                <strong>Genres</strong>
                <p>{movie.genres.map((genre) => genre.name).join(" ")}</p>
              </div>
              <div className={styles.additionalInfo}>
                <h3>Additional information</h3>
                <ul>
                  <li>
                    <Link to="cast" state={{ query }}>
                      Cast
                    </Link>
                  </li>
                  <li>
                    <Link to="reviews" state={{ query }}>
                      Reviews
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Routes>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default MovieDetailsPage;
