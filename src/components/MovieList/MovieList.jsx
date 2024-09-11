import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ moviesList }) => {
  const location = useLocation();
  return (
    <ul>
      {moviesList.map(({ id, title }) => (
        <li key={id}>
          <Link
            state={{ from: location }}
            to={`/movies/${id}`}
            className={css.link}
          >
            <h2>{title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
