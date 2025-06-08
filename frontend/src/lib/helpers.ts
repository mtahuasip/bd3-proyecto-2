import { AuthUser } from "@/types/auth.types";
import { Movie } from "@/types/movies.types";

export const normalizeUser = (user?: AuthUser) => {
  return {
    _id: user?._id ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    roles: user?.roles ?? [],
    streaming_history: user?.streaming_history ?? [],
    created_at: user?.created_at ?? new Date().toISOString(),
    updated_at: user?.updated_at ?? new Date().toISOString(),
    last_login: user?.last_login ?? new Date().toISOString(),
  };
};

export const normalizeMovie = (movie?: Movie): Movie => {
  return {
    _id: movie?._id ?? "",
    title: movie?.title ?? "Título desconocido",
    description: movie?.description ?? "Sin descripción.",
    duration: movie?.duration ?? 120,
    year: movie?.year ?? new Date().getFullYear(),
    categories: movie?.categories ?? [],
    views: movie?.views ?? 0,
    cover_url: movie?.cover_url ?? "https://placehold.co/600x400",
    poster_url: movie?.poster_url ?? "https://placehold.co/400x600",
    thumbnail_url: movie?.thumbnail_url ?? "https://placehold.co/320x180",
    video_url: movie?.video_url ?? "https://www.youtube.com/embed/19g66ezsKAg",
    slug: movie?.slug ?? "pelicula-desconocida",
    created_at: movie?.created_at ?? new Date().toISOString(),
    updated_at: movie?.updated_at ?? new Date().toISOString(),
  };
};
