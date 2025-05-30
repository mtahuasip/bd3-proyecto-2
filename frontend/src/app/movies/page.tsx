import { AccessCard } from "@/components/access-card";
import { CompactPagination } from "@/components/compact-pagination";
import { MostViewedScroll } from "@/components/most-viewed-scroll";
import { RecommendedCarousel } from "@/components/recommended-carousel";
import { Search } from "@/components/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession } from "@/lib/session";
import { getCategories } from "@/services/categories";
import {
  getMovies,
  getMoviesMostViewed,
  getMoviesRecommended,
  getMoviesSamples,
  getMoviesYears,
  getTotalPages,
} from "@/services/movies";
import { Category } from "@/types/category.types";
import { Movie, TimeFrame, Year } from "@/types/movies.types";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | number | string[] | undefined;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const path = await searchParams;

  const buildQueryString = (searchParams: {
    [key: string]: string | number | string[] | undefined;
  }) => {
    let query = "";

    const keys = ["title", "categories", "year", "page"];

    for (const key of keys) {
      const value = searchParams[key];

      switch (key) {
        case "title":
        case "categories":
        case "year":
          if (value !== undefined) {
            query += `${query ? "&" : "?"}${key}=${encodeURIComponent(String(value))}`;
          }
          break;

        default:
          break;
      }
    }

    return query;
  };

  const session = await getSession();
  let movies: Movie[] | null = null;
  let recommended: Movie[] | null = null;
  let mostViewed: Movie[] | null = null;
  let categories: Category[] | null = null;
  let years: Year[] | null = null;

  let currentPage = Number(path.page ?? 1);
  let perPage = 12;
  let totalPages = 0;

  const queryString = await buildQueryString(path);

  try {
    if (session) {
      movies = await getMovies(
        queryString +
          `${queryString ? "&" : "?"}page=${currentPage}&per_page=${perPage}`
      );

      totalPages = await getTotalPages(
        queryString + `${queryString ? "&" : "?"}per_page=${perPage}`
      );
      categories = await getCategories();
      recommended = await getMoviesRecommended(5);
      mostViewed = await getMoviesMostViewed(TimeFrame.WEEK, 10);
    } else {
      movies = await getMoviesSamples(24);
    }
    years = await getMoviesYears();
  } catch (error) {
    console.log(error);
  }

  const MoviePosters = () => (
    <div className="flex flex-wrap items-center gap-4">
      {movies?.map((movie) => (
        <div
          key={movie._id}
          className="w-[calc(50%-0.5rem)] rounded-md shadow-md transition-transform ease-in-out hover:scale-105 md:w-[calc(33%-0.5rem)] lg:w-[calc(24%-0.5rem)]"
        >
          <Link href={`/movies/${movie.slug}`}>
            <Image
              className="h-auto w-full rounded-md object-cover"
              src={movie.poster_url}
              alt={`Poster de la película ${movie.title}`}
              width={720}
              height={1080}
            />
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <section className="px-4 lg:px-16">
      <Tabs
        defaultValue="Recommendations"
        className="pt-16 lg:min-h-svh lg:pt-20"
      >
        <TabsList className="mx-auto lg:mt-2">
          <TabsTrigger value="Recommendations">Recomendaciones</TabsTrigger>
          <TabsTrigger value="movies">Películas</TabsTrigger>
        </TabsList>
        <TabsContent value="Recommendations">
          <section className="flex flex-wrap items-center justify-between gap-4 lg:mt-6 lg:flex-nowrap lg:gap-10">
            <div className="w-full lg:w-[65%]">
              <h1 className="mb-4 text-center text-2xl font-bold md:text-left lg:mb-8 lg:text-5xl">
                Recomendados para ti
              </h1>

              <RecommendedCarousel movies={recommended ?? []} />
            </div>

            <div className="w-full lg:w-[35%]">
              <h2 className="mb-2 text-xl font-bold lg:mb-4 lg:text-3xl">
                Mas vistos esta semana
              </h2>

              <MostViewedScroll movies={mostViewed ?? []} />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="movies">
          <section className="md:mt-4">
            <h2 className="mb-4 text-center text-2xl font-bold md:mb-8 lg:text-4xl">
              Catalogo de películas
            </h2>

            <div className="mb-6">
              <Search />
            </div>

            <MoviePosters />

            <CompactPagination
              className="mt-8 md:mt-10 lg:mt-12"
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </section>
        </TabsContent>
      </Tabs>

      {/*

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

       */}

      {!session && <AccessCard />}
    </section>
  );
}
