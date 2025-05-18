// services/movies/index.ts
import api from './../api'; 

import { Movie } from './types';

export interface GetPopularMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

export interface GetNowPlayingMoviesResponse {
    results: Movie[];
    page: number;
    total_pages: number;
  }

export const getPopularMovies = async (page = 1): Promise<GetPopularMoviesResponse> => {
  const { data } = await api.get('/movie/popular', { params: { language: 'en-US', page } });
  return data;
};
export const getNowPlayingMovies = async (page=1): Promise<GetNowPlayingMoviesResponse> => {
    const {data} = await api.get('/movie/now_playing', {params: {language: 'en-US', page} }) ;
    return data;
};

export const getMovieDetails = async (id: number) => {
  const { data } = await api.get(`/movie/${id}`, { params: { language: 'en-US' } });
  return data;
};
export const getMovieRecommendations = async (id: number) => {
  const { data } = await api.get(`/movie/${id}/recommendations`, {
    params: { language: 'en-US' },
  });
  return data;
};
