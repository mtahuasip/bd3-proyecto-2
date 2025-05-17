import { Movie, TimeFrame, Year } from "@/types/movies";
import apiRequest from "./api-request";

export const getMovies = (headers?: Record<string, string>): Promise<Movie[]> =>
  apiRequest({ method: "GET", endpoint: "/movies", headers });

export const getMoviesRecommended = (
  limit: number,
  headers?: Record<string, string>
): Promise<Movie[]> =>
  apiRequest({
    method: "GET",
    endpoint: `/movies/recommended?limit=${limit}`,
    headers,
  });

export const getMoviesMostViewed = (
  timeFrame: TimeFrame,
  limit: number,
  headers?: Record<string, string>
): Promise<Movie[]> =>
  apiRequest({
    method: "GET",
    endpoint: `/movies/most-viewed/${timeFrame}?limit=${limit}`,
    headers,
  });

export const getMoviesSamples = (limit: number): Promise<Movie[]> =>
  apiRequest({ method: "GET", endpoint: `/movies/samples?limit=${limit}` });

export const getMoviesYears = (): Promise<Year[]> =>
  apiRequest({ method: "GET", endpoint: "/movies/years" });
