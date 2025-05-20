"use client";
import Link from "next/link";
import Image from "next/image";

interface CardMovieProps {
  id: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  score: number;
}

export function CardMovie({
  id,
  title,
  posterPath,
  releaseDate,
  score,
}: CardMovieProps) {
  return (
    <Link
      href={`/movie/${id}`}
      className="block p-4 bg-pink-100 h-[450px]  rounded-3xl overflow-hidden shadow hover:shadow-lg transform transition-transform duration-300 hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt={title}
        width={360} 
        height={300} 
        className="rounded-t-2xl object-cover w-full h-[300px]"
        priority={false}
      />

      <div className="p-4 bg-pink-100">
        <h3 className="font-bold text-lg text-rose-500">{title}</h3>
        <p className="text-sm text-gray-500">{releaseDate}</p>
        <p className="text-lg font-bold">🎀 Score {score.toFixed(1)}</p>
        
      </div>
    </Link>
  );
}
