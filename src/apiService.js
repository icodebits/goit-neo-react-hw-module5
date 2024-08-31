import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YWFhOTMzZWIzYzY0OTcxZmZjNTg4YjU0ZWQzODBlMSIsIm5iZiI6MTcyNTEwNDgzNy45NjIwMDMsInN1YiI6IjY2ZDMwMjI2NDhkM2FhNTAwMDliYTQ3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p2lSdyugt6H_1aX5ky1eE3xu9s_Gqtgkoq6MKdEsOuk';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: API_KEY,
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await apiClient.get('/trending/movie/day');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get('/search/movie', {
      params: {
        query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movieId}:`, error);
    throw error;
  }
};
