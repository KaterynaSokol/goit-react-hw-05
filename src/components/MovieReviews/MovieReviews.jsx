import { useEffect, useState } from "react";
import { requestMovieReviews } from "../../services/api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setIsLoading(true);
      try {
        const response = await requestMovieReviews(movieId);
        setReviews(response);
      } catch (err) {
        console.log("error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map(({ id, author, content }) => {
            return (
              <li key={id} className={css.reviewsItem}>
                <p className={css.author}>Author: {author}</p>
                <p className={css.content}>{content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Sorry, we don&apos;t reviews for this movie yet.</p>
      )}
    </>
  );
};

export default MovieReviews;
