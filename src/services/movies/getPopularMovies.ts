import api from "../api";

export const getPopularMovies = async () => {
  try {
    const { data } = await api.get("/movie/popular?language=en-US");
    return data;
  } catch (err: any) {
    return err.response;
  }
};

