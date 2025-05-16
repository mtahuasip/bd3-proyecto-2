import { RecommendedCarousel } from "@/components/recommended-carousel";
import { getSession } from "@/lib/session";
import { getCategoriesRequest } from "@/services/categories";
import { getMoviesRequest } from "@/services/movies";
import Image from "next/image";

export default async function Page() {
  const session = await getSession();
  const movies = await getMoviesRequest();
  const categories = await getCategoriesRequest();

  const recommended = movies.slice(6, 10);
  const mostViewed = movies.slice(0, 5);

  const movie = movies[0];

  return (
    <section className="px-16">
      {session && (
        <div className="grid max-h-svh w-full grid-cols-3 grid-rows-1 gap-10 pt-20 pb-8">
          <section className="col-span-2">
            <h1 className="mb-6 text-5xl font-bold">Recomendados para ti</h1>

            <RecommendedCarousel movies={recommended} />
          </section>

          <section className="col-span-1">
            <h2 className="mb-4 text-3xl font-bold">Mas vistos esta semana</h2>

            <div className="flex flex-col items-center gap-2">
              {mostViewed.map((movie) => (
                <article className="flex items-center gap-2" key={movie._id}>
                  <Image
                    className="h-24 w-32 rounded-sm object-cover"
                    src={movie.thumbnail_url}
                    alt={`Miniatura de la película ${movie.title}`}
                    width={720}
                    height={480}
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{movie.title}</h4>
                    <p className="line-clamp-2 text-sm">{movie.description}</p>
                    <p className="flex items-center gap-2">
                      <span className="text-xs font-semibold">Estreno:</span>
                      <span className="text-muted-foreground text-sm font-bold">
                        {movie.year}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-xs font-semibold">Duración:</span>
                      <span className="text-muted-foreground text-sm font-bold">
                        {movie.duration}
                      </span>
                      min.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      <div
        className={`grid grid-cols-5 grid-rows-1 gap-4 ${session ? "py-8" : "pt-20 pb-8"}`}
      >
        <aside className="col-span-1 rounded-lg border p-4">
          <h6 className="text-2xl font-bold">Buscar película</h6>
        </aside>

        <section className="col-span-4">
          <h2 className="text-4xl font-bold">Catalogo de películas</h2>
        </section>
      </div>
    </section>
  );
}
