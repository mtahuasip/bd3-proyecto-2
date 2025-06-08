import { AccessCard } from "@/components/access-card";
import { AsideCollapsible } from "@/components/aside-collapsible";
import { CompactPagination } from "@/components/compact-pagination";
import { InputCheckbox } from "@/components/input-checkbox";
import { MostViewedScroll } from "@/components/most-viewed-scroll";
import { RecommendedCarousel } from "@/components/recommended-carousel";
import { Search } from "@/components/search";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSession } from "@/lib/session";
import {
  getMoviePageData,
  getMovies,
  getNoAuthMovies,
  getTotalPages,
} from "@/services/movies";
import Image from "next/image";
import Link from "next/link";

type SearchParamsType = {
  [key: string]: string | number | string[] | undefined;
};

interface PageProps {
  searchParams: Promise<SearchParamsType>;
}

const buildQueryString = (searchParams: SearchParamsType) => {
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

const getData = async (
  searchParams: SearchParamsType,
  currentPage: number,
  perPage: number
) => {
  try {
    const session = await getSession();
    const queryString = buildQueryString(searchParams);

    if (session) {
      const movies = await getMovies(
        queryString +
          `${queryString ? "&" : "?"}page=${currentPage}&per_page=${perPage}`
      );
      const totalPages = await getTotalPages(
        queryString + `${queryString ? "&" : "?"}per_page=${perPage}`
      );

      const { recommended, most_viewed, categories, years } =
        await getMoviePageData();

      return {
        session,
        movies,
        totalPages,
        recommended,
        most_viewed,
        categories,
        years,
      };
    } else {
      const movies = await getNoAuthMovies();

      return {
        session: null,
        movies,
        totalPages: 0,
        recommended: [],
        most_viewed: [],
        categories: [],
        years: [],
      };
    }
  } catch (error) {
    console.error("Error in getData:", error);
    return {
      session: null,
      movies: [],
      totalPages: 0,
      recommended: [],
      most_viewed: [],
      categories: [],
      years: [],
    };
  }
};

export default async function Page({ searchParams }: PageProps) {
  const path = await searchParams;
  const currentPage = Number(path.page ?? 1);
  const perPage = 12;
  const {
    session,
    movies,
    categories,
    most_viewed,
    recommended,
    totalPages,
    years,
  } = await getData(path, currentPage, perPage);

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
              src={movie.poster_url || "/images/herp-bg.webp"}
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
        defaultValue={session !== null ? "Recommendations" : "catalog"}
        className="pt-16 lg:min-h-svh lg:pt-20"
      >
        <TabsList className="mx-auto lg:mt-2">
          <TabsTrigger
            value="Recommendations"
            disabled={session ? false : true}
          >
            Recomendaciones
          </TabsTrigger>
          <TabsTrigger value="catalog">Catalogo</TabsTrigger>
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

              <MostViewedScroll movies={most_viewed ?? []} />
            </div>
          </section>
        </TabsContent>

        <TabsContent value="catalog">
          <section className="md:mt-4">
            <h2 className="mb-4 text-center text-2xl font-bold md:mb-8 lg:text-4xl">
              Catalogo de películas
            </h2>

            <div className="flew-wrap mb-6 gap-8 lg:flex">
              {session && (
                <>
                  <AsideCollapsible
                    categories={categories || []}
                    years={years || []}
                  />

                  <aside className="hidden min-w-80 lg:block">
                    <div>
                      <h6 className="mb-4 text-2xl font-bold">
                        Buscar película
                      </h6>
                      <Search />
                    </div>

                    <div className="flex justify-between gap-4">
                      <div className="px-4">
                        <h6 className="mt-4 text-2xl font-bold">Categoría</h6>
                        <div className="mt-4 flex flex-col gap-2">
                          {categories?.map((category) => (
                            <InputCheckbox
                              key={category._id}
                              id={category._id}
                              label={category.name}
                              query="categories"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="px-4">
                        <h6 className="mt-4 text-2xl font-bold">Año</h6>
                        <div className="mt-4 flex flex-col gap-2">
                          {years?.map((year) => (
                            <InputCheckbox
                              key={year.id}
                              id={year.id}
                              label={year.year}
                              query="year"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </aside>
                </>
              )}

              <div className="mb-8">
                <MoviePosters />
                {session && (
                  <CompactPagination
                    className="mt-8 md:mt-10 lg:mt-12"
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                )}
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>

      {!session && <AccessCard />}
    </section>
  );
}
