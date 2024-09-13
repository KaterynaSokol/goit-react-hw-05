import { useEffect, useState } from "react";
import { requestMoviesBySearchValue } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import { useSearchParams } from "react-router-dom";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("searchValue");

  useEffect(() => {
    if (!searchValue) return;

    const fetchMoviesSearch = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { results } = await requestMoviesBySearchValue(searchValue);
        setMoviesSearch(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesSearch();
  }, [searchValue]);

  const handleSubmit = (value) => {
    setSearchParams({
      searchValue: value,
    });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      {<MovieList moviesList={moviesSearch} />}

      {isLoading && <Loader />}
      {error && <p>Something went wrong...</p>}
    </div>
  );
};

export default MoviesPage;
