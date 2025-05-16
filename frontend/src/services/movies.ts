import { Movie } from "@/types/movies";
import apiRequest from "./api-request";

export const getMoviesRequest = (): Promise<Movie[]> =>
  apiRequest({ method: "GET", endpoint: "/movies" });
