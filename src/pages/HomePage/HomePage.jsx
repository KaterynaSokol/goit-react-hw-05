import { useEffect, useState } from "react";
import { requestAllMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [trendMovies, setTrendsMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setIsLoading(true);
      try {
        const response = await requestAllMovies();
        setTrendsMovies(response.results);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchAllMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Loader />}
      {error && (
        <p style={{ color: "red" }}>{error}! Please, try again later!</p>
      )}
      {trendMovies.length > 0 && <MovieList moviesList={trendMovies} />}
    </div>
  );
};

export default HomePage;
