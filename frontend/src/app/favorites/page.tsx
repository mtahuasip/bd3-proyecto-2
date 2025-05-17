import { Button } from "@/components/ui/button";
import { getMoviesSamples } from "@/services/movies";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const movies = await getMoviesSamples(8);

  return (
    <section className="px-40 pt-20 pb-8">
      <h1 className="mb-10 text-center text-5xl font-bold">Tus favoritos</h1>

      <div className="flex flex-wrap items-center gap-10">
        {movies?.map((movie) => (
          <article key={movie._id} className="relative">
            <Image
              className="h-72 w-52 rounded-md mask-b-from-20% mask-b-to-80% object-cover"
              src={movie.poster_url}
              alt={`Poster de la película ${movie.title}`}
              width={720}
              height={1080}
            />
            <div className="absolute bottom-0 left-0 w-full">
              <h2 className="mb-2 text-center text-lg font-semibold">
                {movie.title}
              </h2>
              <Button asChild className="w-full" variant="outline">
                <Link href={`/movies/${movie.slug}`}>Ver</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
