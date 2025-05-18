'use client';
import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '@/services/movies';
import { Movie } from '@/services/movies/types';
import { CardMovie } from '@/components/MovieDisplay/CardMovie';

const MyFavoritesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = localStorage.getItem('favoriteMovies');
      const ids = stored ? JSON.parse(stored) : [];

      const promises = ids.map((id: number) => getMovieDetails(id));
      const results = await Promise.all(promises);
      setFavoriteMovies(results);
    };

    loadFavorites();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tus películas favoritas ❤️</h1>
      {favoriteMovies.length === 0 ? (
        <p>No has marcado ninguna película como favorita.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {favoriteMovies.map((movie) => (
            <CardMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
              score={movie.vote_average}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavoritesPage;
