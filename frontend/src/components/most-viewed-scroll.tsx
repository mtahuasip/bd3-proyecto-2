import { ScrollArea } from "@/components/ui/scroll-area";
import { Movie } from "@/types/movies.types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface MostViewedScrollProps {
  movies?: Movie[];
}

export const MostViewedScroll: FC<MostViewedScrollProps> = ({ movies }) => {
  return (
    <ScrollArea className="h-[525px]">
      <div className="flex flex-col gap-2 py-2 md:px-4">
        {movies?.map((movie) => (
          <div className="flex items-center gap-2" key={movie._id}>
            <Image
              className="h-24 w-20 rounded-sm object-cover md:h-24 md:w-32"
              src={movie.cover_url || "/images/hero-bg.webp"}
              alt={`Miniatura de la película ${movie.title}`}
              width={720}
              height={480}
            />
            <div>
              <h4 className="font-semibold underline-offset-1 hover:underline md:text-lg">
                <Link href={`/movies/${movie.slug}`}>{movie.title}</Link>
              </h4>
              <p className="line-clamp-2 text-sm">
                {movie.description ||
                  "Esta película no cuenta con una descripción, por favor espera que se actualice. Disculpas."}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-xs font-semibold">Estreno:</span>
                <span className="text-muted-foreground text-xs font-bold sm:text-sm">
                  {movie.year}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-xs font-semibold">Duración:</span>
                <span className="text-muted-foreground text-xs font-bold sm:text-sm">
                  {movie.duration || "No disponible"}
                </span>
                {movie.duration && "minutos"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
