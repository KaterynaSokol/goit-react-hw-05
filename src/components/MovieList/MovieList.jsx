import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ moviesList }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {moviesList.map(({ id, title }) => (
        <li key={id}>
          <Link
            state={{ from: location }}
            to={`/movies/${id}`}
            className={css.movieItem}
          >
            <h2 className={css.movieTitle}>⭐ {title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
