import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { requestMovieDetails } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const data = await requestMovieDetails(movieId);
        setMovieDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div>
      <Link to={backLinkRef.current} className={css.goBackBtn}>
        ◀️ Go back{" "}
      </Link>

      {movieDetails !== null && (
        <div className={css.container}>
          <img
            className={css.movieImage}
            src={imgUrl + movieDetails.backdrop_path}
            alt={`${movieDetails.title} movie-cover`}
          />
          <div className={css.movieInfo}>
            <h1 className={css.movieTitle}>
              {movieDetails.title}{" "}
              <span className={css.movieYear}>
                ({movieDetails.release_date.split("-")[0]})
              </span>
            </h1>
            <p className={css.movieScore}>
              User Score:{" "}
              <span className={css.movieUserScoreSpan}>
                {Math.floor(parseFloat(movieDetails.vote_average) * 10)}
              </span>
              %
            </p>
            <h2 className={css.movieSubTitle}>Overview</h2>
            <p className={css.movieDescr}>{movieDetails.overview}</p>
            <h2 className={css.movieSubTitle}>Genres</h2>
            <p className={css.movieDescr}>
              {movieDetails?.genres?.map((genre) => genre.name).join(" ")}
            </p>
          </div>
        </div>
      )}
      <div className={css.additionalContainer}>
        <h2 className={css.movieSubTitle}>Aditional information</h2>
        <NavLink to="cast" className={css.movieDescr}>
          {" "}
          🎥 Cast
        </NavLink>
        <NavLink to="reviews" className={css.movieDescr}>
          👏 Reviews
        </NavLink>
      </div>
      <div>
        <Outlet />
      </div>
      {isLoading && <Loader />}
      {error !== null && (
        <p style={{ color: "red" }}>{error}. Please, try again later.</p>
      )}
    </div>
  );
};
export default MovieDetailsPage;
