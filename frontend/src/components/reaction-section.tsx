"use client";

import { ReactionButton } from "@/components/reaction-button";
import { normalizeMovie, normalizeUser } from "@/lib/helpers";
import { parseError } from "@/lib/utils";
import { reaction } from "@/services/reaction";
import { AuthUser } from "@/types/auth.types";
import { Movie } from "@/types/movies.types";
import { Heart, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

interface ReactionSectionProps {
  movie?: Movie;
  user?: AuthUser;
}

export const ReactionSection = ({ movie, user }: ReactionSectionProps) => {
  const [message, setMessage] = useState("");

  if (!user || !movie) return;

  const handleReaction = async (type: "like" | "dislike" | "favorite") => {
    try {
      const normalizedUser = normalizeUser(user);
      const normalizedMovie = normalizeMovie(movie);

      const data = {
        type,
        user: normalizedUser,
        movie: normalizedMovie,
      };

      await reaction(data);
      const mensajes = {
        like: "¡Gracias por tu me gusta!",
        dislike: "Registrado: no te gustó.",
        favorite: "Agregado a favoritos.",
      };

      setMessage(mensajes[type]);
    } catch (error) {
      const parsed = parseError(error as Error);

      setMessage(parsed.message);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center gap-8 py-2">
        <ReactionButton
          label="Me gusta"
          Icon={ThumbsUp}
          onClick={() => handleReaction("like")}
        />
        <ReactionButton
          label="No me gusta"
          Icon={ThumbsDown}
          onClick={() => handleReaction("dislike")}
        />
        <ReactionButton
          label="Agregar a favoritos"
          Icon={Heart}
          onClick={() => handleReaction("favorite")}
        />
      </div>
      {message && (
        <p className="text-sm font-semibold text-green-600">{message}</p>
      )}
    </div>
  );
};
