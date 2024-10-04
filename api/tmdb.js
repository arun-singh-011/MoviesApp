import axios from 'axios';

const API_KEY = 'ad7acfbadc1dc80a99eefb62f7f053bf';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchNowPlaying = () => tmdb.get('/movie/now_playing');
export const fetchPopular = () => tmdb.get('/movie/popular');
export const fetchTopRated = () => tmdb.get('/movie/top_rated');
export const fetchUpcoming = () => tmdb.get('/movie/upcoming');

export const fetchAiringToday = () => tmdb.get('/tv/airing_today');
export const fetchTVPopular = () => tmdb.get('/tv/popular');
export const fetchTVTopRated = () => tmdb.get('/tv/top_rated');
export const fetchOnTheAir = () => tmdb.get('/tv/on_the_air');

export const searchMulti = (query, type) =>
  tmdb.get('/search/multi', {
    params: {
      query,
    },
  });

export const fetchMovieDetails = (id) => tmdb.get(`/movie/${id}`);
export const fetchTVDetails = (id) => tmdb.get(`/tv/${id}`);
