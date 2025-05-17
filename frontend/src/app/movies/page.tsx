import { AccessCard } from "@/components/access-card";
import { InputCheckbox } from "@/components/input-checkbox";
import { InputSearchForm } from "@/components/input-search-form";
import { RecommendedCarousel } from "@/components/recommended-carousel";
import { getSession } from "@/lib/session";
import { getCategories } from "@/services/categories";
import {
  getMovies,
  getMoviesMostViewed,
  getMoviesRecommended,
  getMoviesSamples,
  getMoviesYears,
} from "@/services/movies";
import { TimeFrame } from "@/types/movies";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const session = await getSession();
  const headers = session ?? undefined;

  let movies, categories, recommended, mostViewed, years;

  try {
    if (session) {
      movies = await getMovies(headers);
      categories = await getCategories(headers);
      recommended = await getMoviesRecommended(5, headers);
      mostViewed = await getMoviesMostViewed(TimeFrame.WEEK, 5, headers);
    } else {
      movies = await getMoviesSamples(24);
    }
    years = await getMoviesYears();
  } catch {
    throw new Error("Fallo al cargar los datos");
  }

  return (
    <section className="px-16">
      {session && (
        <div className="grid max-h-svh w-full grid-cols-3 grid-rows-1 gap-10 pt-20 pb-8">
          <section className="col-span-2">
            <h1 className="mb-6 text-5xl font-bold">Recomendados para ti</h1>

            <RecommendedCarousel movies={recommended ?? []} />
          </section>

          <section className="col-span-1">
            <h2 className="mb-4 text-3xl font-bold">Mas vistos esta semana</h2>

            <div className="flex flex-col items-center gap-2">
              {mostViewed?.map((movie) => (
                <article className="flex items-center gap-2" key={movie._id}>
                  <Image
                    className="h-24 w-32 rounded-sm object-cover"
                    src={movie.cover_url}
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
        className={`grid grid-cols-6 grid-rows-1 gap-10 ${session ? "py-8" : "pt-20 pb-8"}`}
      >
        {session && (
          <aside className={`${session ? "col-span-2" : "col-span-0"}`}>
            <h6 className="mt-4 text-2xl font-bold">Buscar película</h6>
            <div className="mt-6 ml-6">
              <InputSearchForm />
            </div>

            <h6 className="mt-4 text-2xl font-bold">Categorías</h6>
            <div className="mt-4 ml-6 flex flex-col gap-2">
              {categories?.map((category) => (
                <InputCheckbox
                  key={category._id}
                  id={category._id}
                  label={category.name}
                />
              ))}
            </div>

            <h6 className="mt-4 text-2xl font-bold">Año</h6>
            <div className="mt-4 ml-6 flex flex-col gap-2">
              {years?.map((year) => (
                <InputCheckbox key={year.id} id={year.id} label={year.year} />
              ))}
            </div>
          </aside>
        )}

        <section className={`${session ? "col-span-4" : "col-span-6"}`}>
          <h2
            className={`mb-6 text-4xl font-bold ${!session && "text-center"}`}
          >
            Catalogo de películas
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-6">
            {movies?.map((movie) => (
              <article
                key={movie._id}
                className="rounded-md shadow-md transition-transform ease-in-out hover:scale-105"
              >
                <Link href={`/movies/${movie.slug}`}>
                  <Image
                    className="h-72 w-52 rounded-md object-cover"
                    src={movie.poster_url}
                    alt={`Poster de la película ${movie.title}`}
                    width={720}
                    height={1080}
                  />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      {!session && <AccessCard />}
    </section>
  );
}
