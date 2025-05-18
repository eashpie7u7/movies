'use client'

import React, { useEffect, useState } from "react";

import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";

const TopRatedPage = () => {

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getTopRatedMovies();
        setMovies(data.results);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div></div>

  );
};

export default TopRatedPage;
