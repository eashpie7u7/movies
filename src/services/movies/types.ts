export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }
  export interface GetPopularMoviesResponse {
    results: Movie[];
    page: number;
    total_pages: number;
  }
  export interface GetTopRatedMoviesResponse {
    results: Movie[];
    page: number;
    total_pages: number;
  }
  export interface  GetNowPlayingMoviesResponse{
    results: Movie[];
    page: number;
    total_pages: number;

  }