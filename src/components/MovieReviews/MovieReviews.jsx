import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWFhOTMzZWIzYzY0OTcxZmZjNTg4YjU0ZWQzODBlMSIsIm5iZiI6MTcyNTEwNDgzNy45NjIwMDMsInN1YiI6IjY2ZDMwMjI2NDhkM2FhNTAwMDliYTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p2lSdyugt6H_1aX5ky1eE3xu9s_Gqtgkoq6MKdEsOuk",
            },
          }
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.reviewsContainer}>
      <h2 className={styles.heading}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h3 className={styles.author}>Review by {review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>No reviews available for this movie.</p>
      )}
    </div>
  );
}

export default MovieReviews;