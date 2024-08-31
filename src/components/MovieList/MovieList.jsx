import { Link } from "react-router-dom";

function MovieList({ movies, from, query }) {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
            <Link
                to={`/movies/${movie.id}`}
                from={from}
                state={{ query }}
            >
                {movie.title}
            </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;
