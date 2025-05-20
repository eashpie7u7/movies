import api from "../api";

export const getTopRatedMovies = async () => {
  try {
    const { data } = await api.get("/movie/top_rated?language=en-US");
    return data;
  } catch (err: any) {
    return err.response;
  }
};
