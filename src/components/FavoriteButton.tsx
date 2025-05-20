'use client';
import { useEffect, useState } from 'react';

interface Props {
  movieId: number;
}

export function FavoriteButton({ movieId }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('favoriteMovies');
    const favorites = stored ? JSON.parse(stored) : [];
    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);

  const toggleFavorite = () => {
    const stored = localStorage.getItem('favoriteMovies');
    let favorites = stored ? JSON.parse(stored) : [];

    if (favorites.includes(movieId)) {
      favorites = favorites.filter((id: number) => id !== movieId);
    } else {
      favorites.push(movieId);
    }

    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="mt-12 inline-block bg-pink-200 text-pink-500 font-bold px-6 py-2 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
    >
      {isFavorite ? '❤️ Quitar' : '🩷 Marcar favorito'}
    </button>
  );
}
