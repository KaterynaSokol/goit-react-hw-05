import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTE2ZGMwYjRkZDg2Mjg2Yzg1NTMyOTUyODk2YzIwNiIsIm5iZiI6MTcyNjA3MTg4OS4xODQ1NDUsInN1YiI6IjY2ZTFiNDY1MGJhYjdlNjc5YTFjNDU3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KqS-IzN_EXF6sTfq7WhjPr0e2fjLi-MCaVT1yDml_ZA",
  },
};

export const requestAllMovies = async () => {
  const response = await axios.get("trending/movie/day", options);
  return response.data;
};

export const requestMoviesBySearchValue = async (searchValue) => {
  const response = await axios.get(
    `search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};

export const requestMovieDetails = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
};

export const requestMovieCast = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const requestMovieReviews = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data.results;
};
