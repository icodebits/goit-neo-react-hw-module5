import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
    const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWFhOTMzZWIzYzY0OTcxZmZjNTg4YjU0ZWQzODBlMSIsIm5iZiI6MTcyNTEwNDgzNy45NjIwMDMsInN1YiI6IjY2ZDMwMjI2NDhkM2FhNTAwMDliYTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p2lSdyugt6H_1aX5ky1eE3xu9s_Gqtgkoq6MKdEsOuk",
            },
          }
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className={styles.castContainer}>
      <h2 className={styles.heading}>Cast</h2>
      
          {cast.length > 0 ? (
              <ul className={styles.castList}>{
                  cast.map((actor) => (
                      <li key={actor.cast_id} className={styles.castItem}>
                          <img
                              src={
                                  actor.profile_path
                                      ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                      : "/default-profile.png"
                              }
                              alt={actor.name}
                              className={styles.actorImage}
                          />
                          <div className={styles.actorInfo}>
                              <p className={styles.actorName}>{actor.name}</p>
                              <p className={styles.characterName}>as {actor.character}</p>
                          </div>
                      </li>
                  ))}
              </ul>
        ) : (
          <p className={styles.noReviews}>No cast available for this movie.</p>
        )}
    </div>
  );
}

export default MovieCast;