"use server";

import api from "@/lib/fetch";
import { Movie, TimeFrame, Year } from "@/types/movies.types";

export const getMovies = async (query?: string): Promise<Movie[]> =>
  await api({ endpoint: `/movies${query}` });

export const getMoviesRecommended = async (limit?: number): Promise<Movie[]> =>
  await api({ endpoint: `/movies/recommended?limit=${limit || 5}` });

export const getMoviesMostViewed = async (
  timeFrame: TimeFrame,
  limit?: number
): Promise<Movie[]> =>
  await api({
    endpoint: `/movies/most-viewed/${timeFrame}?limit=${limit || 5}`,
  });

export const getNoAuthMovies = async (): Promise<Movie[]> =>
  await api({ endpoint: "/pages/no-auth/movies" });

export const getMoviesYears = async (): Promise<Year[]> =>
  await api({ endpoint: "/movies/years" });

export const getMovieBySlug = async (slug: string): Promise<Movie> =>
  await api({ endpoint: `/movies/by/${slug}` });

export const updateMovieViews = async (id: string): Promise<Movie> =>
  await api({ method: "PATCH", endpoint: `/movies/update-views/${id}` });

export const updateMovieViewsBySlug = async (slug: string): Promise<Movie> =>
  await api({ method: "PATCH", endpoint: `/movies/update-views/by/${slug}` });

export const getTotalPages = async (query: string): Promise<number> => {
  const response: { total_pages: number } = await api({
    endpoint: `/movies/total-pages${query}`,
  });

  return response.total_pages;
};
