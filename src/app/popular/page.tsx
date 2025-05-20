import { GetPopularMoviesResponse } from '@/services/movies/types';
import { getPopularMovies } from '../../services/movies';
import { CardMovie } from '../../components/MovieDisplay/CardMovie';
import Link from 'next/link';

interface Props {
  searchParams: { page?: string };
}

export default async function TopRated({ searchParams }: Props) {
  const page = Number(searchParams.page || '1');
  const data: GetPopularMoviesResponse = await getPopularMovies(page);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Popular Movies (Page {page})</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {data.results.map(m => (
          <CardMovie
            key={m.id}
            id={m.id}
            title={m.title}
            posterPath={m.poster_path}
            releaseDate={m.release_date}
            score={m.vote_average}
          />
        ))}
      </div>
      <div className="flex justify-between mt-8 px-6">
        {page > 1 ? (
          <Link
            href={`/now-playing?page=${page - 1}`}
            className="inline-block bg-pink-200 text-rose-500 font-bold px-6 py-2 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            ← Anterior
          </Link>
        ) : (
          <div /> 
        )}

        {page < data.total_pages && (
          <Link
            href={`/now-playing?page=${page + 1}`}
            className="inline-block bg-pink-200 text-rose-500 font-bold px-6 py-2 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Siguiente →
          </Link>
        )}
      </div>
    </div>
  );
}
