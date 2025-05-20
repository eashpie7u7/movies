import { getMovieDetails } from '../../../services/movies/index';
import {  getMovieRecommendations } from '../../../services/movies/index';
import Link from 'next/link';
import Image from 'next/image';
import {FavoriteButton} from "../../../components/FavoriteButton"

interface Props { params: { id: string } }

export default async function MovieDetailPage({ params }: Props) {
  const movieId = Number(params.id);
  const movie = await getMovieDetails(movieId);
  const recommendations = await getMovieRecommendations(movieId);


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl text-rose-500 font-bold mb-4">{movie.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={300}
          height={450}
          className="rounded-lg"
        />
        <div>
          <p className='font-bold text-2xl'><strong>Release Date:</strong> {movie.release_date}</p>
          <p className='font-bold text-xl'><strong> 🎀 Score:</strong> {movie.vote_average}</p>
          <p className="mt-4">{movie.overview}</p>
          <FavoriteButton movieId={movie.id} />

        </div>
      </div>
      {recommendations.results.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recommended Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 ">
            {recommendations.results.slice(0, 10).map((rec) => (
              <Link
                key={rec.id}
                href={`/movie/${rec.id}`}
                className="bg-pink-100 w-40 p-1 h-[280] rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                  alt={rec.title}
                  width={400}
                  height={300}
                  className="w-full object-cover"
                />
                <div className="p-2">
                  <h3 className="text-sm  font-bold text-pink-400">{rec.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
