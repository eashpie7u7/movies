'use client';

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { GetNowPlayingMoviesResponse } from "@/services/movies/types";
import { getNowPlayingMovies } from "@/services/movies";
import { CardMovie } from "../../components/MovieDisplay/CardMovie";


const LoadingUI = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Now playing Movies</h1>
    <div className="flex justify-center items-center min-h-[300px]">
      <p>Loading...</p>
    </div>
  </div>
);


function NowPlayingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = Number(searchParams.get('page') || '1');
  const [moviesData, setMoviesData] = React.useState<GetNowPlayingMoviesResponse | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data: GetNowPlayingMoviesResponse = await getNowPlayingMovies(page);
        setMoviesData(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (loading) {
    return <LoadingUI />;
  }

  if (!moviesData) {
    return <div className="p-6">No data available</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Now playing Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {moviesData.results.map((m) => (
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
            href={createPageUrl(page - 1)}
            className="inline-block bg-pink-200 text-rose-500 font-bold px-6 py-2 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            ← Anterior
          </Link>
        ) : (
          <div />
        )}
        {moviesData.total_pages > page && (
          <Link
            href={createPageUrl(page + 1)}
            className="inline-block bg-pink-200 text-rose-500 font-bold px-6 py-2 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
            Siguiente →
          </Link>
        )}
      </div>
    </div>
  );
}


export default function NowPlayingPage() {
  return (
    <Suspense fallback={<LoadingUI />}>
      <NowPlayingContent />
    </Suspense>
  );
}