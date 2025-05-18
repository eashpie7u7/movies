import React from "react";
import Link from 'next/link';
import { GetNowPlayingMoviesResponse } from '@/services/movies/types';
import { getNowPlayingMovies } from '@/services/movies';
import { CardMovie } from '../../components/MovieDisplay/CardMovie';


interface Props {
    searchParams: { page?: string };
  }

  export default async function NowPlayingPage ({ searchParams }: Props) {
 
    const page = Number(searchParams.page || '1');
    const data: GetNowPlayingMoviesResponse = await getNowPlayingMovies(page);
  
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
        <div className="flex justify-between mt-8">
          {page > 1 && <Link href={`/now-playing?page=${page - 1}`}>← Anterior</Link>}
          {page < data.total_pages && <Link href={`/now-playing?page=${page + 1}`}>Siguiente →</Link>}
        </div>
      </div>
    );
}

