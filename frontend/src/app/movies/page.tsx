// import { InputCheckbox } from "@/components/input-checkbox";
// import { InputSearchForm } from "@/components/input-search-form";
// import { RecommendedCarousel } from "@/components/recommended-carousel";
// import { getSession } from "@/lib/session";
// import { getCategoriesRequest } from "@/services/categories";
// import { getMoviesRequest } from "@/services/movies";
// import Image from "next/image";

// export default async function Page() {
//   const session = await getSession();
//   const movies = await getMoviesRequest();
//   const categories = await getCategoriesRequest();

//   const recommended = movies.slice(6, 10);
//   const mostViewed = movies.slice(0, 5);

//   const seenYears = new Set();
//   const years: { _id: string; year: string }[] = [];

//   movies.forEach((movie) => {
//     const year = movie.year.toString();
//     if (!seenYears.has(year)) {
//       seenYears.add(year);
//       years.push({
//         _id: movie._id,
//         year,
//       });
//     }
//   });
//   years.sort((a, b) => Number(b.year) - Number(a.year));

//   return (
//     <section className="px-16">
//       {session && (
//         <div className="grid max-h-svh w-full grid-cols-3 grid-rows-1 gap-10 pt-20 pb-8">
//           <section className="col-span-2">
//             <h1 className="mb-6 text-5xl font-bold">Recomendados para ti</h1>

//             <RecommendedCarousel movies={recommended} />
//           </section>

//           <section className="col-span-1">
//             <h2 className="mb-4 text-3xl font-bold">Mas vistos esta semana</h2>

//             <div className="flex flex-col items-center gap-2">
//               {mostViewed.map((movie) => (
//                 <article className="flex items-center gap-2" key={movie._id}>
//                   <Image
//                     className="h-24 w-32 rounded-sm object-cover"
//                     src={movie.thumbnail_url}
//                     alt={`Miniatura de la película ${movie.title}`}
//                     width={720}
//                     height={480}
//                   />
//                   <div>
//                     <h4 className="text-lg font-semibold">{movie.title}</h4>
//                     <p className="line-clamp-2 text-sm">{movie.description}</p>
//                     <p className="flex items-center gap-2">
//                       <span className="text-xs font-semibold">Estreno:</span>
//                       <span className="text-muted-foreground text-sm font-bold">
//                         {movie.year}
//                       </span>
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <span className="text-xs font-semibold">Duración:</span>
//                       <span className="text-muted-foreground text-sm font-bold">
//                         {movie.duration}
//                       </span>
//                       min.
//                     </p>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </section>
//         </div>
//       )}

//       <div
//         className={`grid grid-cols-6 grid-rows-1 gap-10 ${session ? "py-8" : "pt-20 pb-8"}`}
//       >
//         <aside className="col-span-2">
//           <h6 className="mt-4 text-2xl font-bold">Buscar película</h6>
//           <div className="mt-6 ml-6">
//             <InputSearchForm />
//           </div>

//           <h6 className="mt-4 text-2xl font-bold">Categorías</h6>
//           <div className="mt-4 ml-6 flex flex-col gap-2">
//             {categories.map((category) => (
//               <InputCheckbox
//                 key={category._id}
//                 id={category._id}
//                 label={category.name}
//               />
//             ))}
//           </div>

//           <h6 className="mt-4 text-2xl font-bold">Año</h6>
//           <div className="mt-4 ml-6 flex flex-col gap-2">
//             {years.map((year) => (
//               <InputCheckbox key={year._id} id={year._id} label={year.year} />
//             ))}
//           </div>
//         </aside>

//         <section className="col-span-4">
//           <h2 className="mb-6 text-4xl font-bold">Catalogo de películas</h2>

//           <div className="flex flex-wrap items-center justify-between gap-6">
//             {movies.map((movie) => (
//               <article key={movie._id}>
//                 <Image
//                   className="h-72 w-52 rounded-md object-cover"
//                   src={movie.poster_url}
//                   alt={`Poster de la película ${movie.title}`}
//                   width={720}
//                   height={1080}
//                 />
//               </article>
//             ))}
//           </div>
//         </section>
//       </div>
//     </section>
//   );
// }

export default async function Page() {
  return <div>Movies</div>;
}
