import api from "../api";

export const getTopRatedMovies = async () => {
  let res: any;
  const endpoint = "/movie/top_rated?language=en-US";
  await api
    .get(endpoint)
    .then((data) => {
      res = data.data; // data solo es el nombre de la respuesta
    })
    .catch((err) => {
      res = err.response; // response trae todo la info del error
    });
  return res;
};
