import { useEffect, useState } from "react";
import { requestMovieCast } from "../../services/api";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();
  useEffect(() => {
    const fetchMovieCast = async () => {
      setIsLoading(true);
      try {
        const response = await requestMovieCast(movieId);
        setCast(response);
      } catch (err) {
        console.log("error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  const imgUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <ul className={css.castList}>
      {isLoading && <Loader />}
      {cast !== null &&
        cast.map(({ id, name, character, profile_path }) => {
          return (
            <li key={id}>
              {profile_path === null ? (
                <div className={css.noPhoto}>
                  <p>👻 No photo</p>
                </div>
              ) : (
                <img
                  className={css.photo}
                  src={imgUrl + profile_path}
                  alt={name + " photo"}
                  height="250"
                />
              )}
              <p className={css.castInfo}>{name}</p>
              <p className={css.castInfo}>Character: {character}</p>
            </li>
          );
        })}
    </ul>
  );
};

export default MovieCast;
