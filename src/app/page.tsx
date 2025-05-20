import React from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import { CardMovie } from "@/components/MovieDisplay/CardMovie";
import Link from "next/link";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

export default async function HomePage() {
  const [topRated, popular, nowPlaying] = await Promise.all([
    getTopRatedMovies(1),
    getPopularMovies(),
    getNowPlayingMovies(),
  ]);

  const heroMovie = nowPlaying.results[0];

  return (
    <main className="min-h-screen bg-white text-black">
      <section
        className="relative h-[80vh] w-full flex items-end p-12 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})`,
        }}
      >
        <div className="bg-gradient-to-t from-black to-transparent absolute inset-0" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            {heroMovie.title}
          </h1>
          <p className="text-lg text-gray-200 mb-6 line-clamp-3 drop-shadow-md">
            {heroMovie.overview}
          </p>
          <Link
            href={`/movie/${heroMovie.id}`}
            className="inline-block px-6 py-3 bg-pink-200 text-black font-bold rounded-lg hover:bg-red-700 transition"
          >
            🩷 Ver ahora →
          </Link>
        </div>
      </section>
      <div >
        <MovieRow
          title =" Now Playing"
          href="/now-playing"
          movies={nowPlaying.results.slice(0, 5)}
          titleClassName={pacifico.className}
        />

        <MovieRow
          title="Popular movies"
          href="/popular"
          movies={popular.results.slice(0, 5)}
          titleClassName={pacifico.className}
        />
        <MovieRow
          title="Top Rated movies"
          href="/top-rated"
          movies={topRated.results.slice(0, 5)}

        />
      </div>
    </main>
  );
}

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
};

function MovieRow({
  title,
  href,
  movies,
}: {
  title: string;
  href: string;
  movies: Movie[];
  titleClassName?: string;
}) {
  return (
    <section className="px-8 py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href={href}
          className="inline-block bg-pink-300 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          🎬 Ver más →
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {movies.map((m) => (
          <div key={m.id} className="flex-shrink-0 w-60 h-[450]">
            <CardMovie
              id={m.id}
              title={m.title}
              posterPath={m.poster_path}
              releaseDate={m.release_date}
              score={m.vote_average}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
