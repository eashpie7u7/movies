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
      className={`text-lg ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
    >
      {isFavorite ? '❤️ Quitar' : '🤍 Marcar favorito'}
    </button>
  );
}
