import { CommentForm } from "@/components/comment-form";
import { CommentScroll } from "@/components/comment-scroll";
import { ReactionSection } from "@/components/reaction-section";
import { VideoPlayer } from "@/components/video-player";
import { profile } from "@/services/auth";
import { getCommentsByMovie } from "@/services/comment";
import { updateMovieViewsBySlug } from "@/services/movies";
import { CalendarDays, Clock3, Eye } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug?: string }>;
}

const getData = async (path?: { slug?: string }) => {
  try {
    if (!path?.slug) throw new Error("No slug provided");

    const user = await profile();
    const movie = await updateMovieViewsBySlug(path.slug);

    if (!movie) throw new Error("Movie not found");

    const comments = await getCommentsByMovie(movie?._id || "");

    return { user, movie, comments };
  } catch (error) {
    console.error("Error in getData:", error);
    return { user: null, movie: null, comments: [] };
  }
};

export default async function Page({ params }: PageProps) {
  const path = await params;
  const { user, movie, comments } = await getData(path);

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return "https://www.youtube.com/embed/19g66ezsKAg";
    const videoId = new URL(url).searchParams.get("v");

    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="flex flex-wrap items-start justify-between gap-4 px-4 pt-20 md:px-8 lg:flex-nowrap lg:gap-10 lg:px-16">
      <div className="w-full lg:w-[65%]">
        <h1 className="mb-4 text-center text-3xl font-extrabold md:text-left lg:mb-4 lg:text-4xl">
          {movie?.title}
        </h1>

        <Suspense fallback={<p>Loading video...</p>}>
          <VideoPlayer src={getYouTubeEmbedUrl(movie?.video_url)} />
        </Suspense>

        <ReactionSection movie={movie || undefined} user={user || undefined} />

        <div className="my-8">
          <div className="flex gap-4">
            <div className="px-8">
              <Image
                className="h-52 w-36 rounded-md object-cover"
                src={movie?.poster_url || "/images/hero-bg.webp"}
                alt={`Poster de la película ${movie?.title}`}
                width={720}
                height={1080}
              />
            </div>

            <div className="flex flex-col justify-between">
              <p className="flex items-center gap-2">
                <span className="text-2xl font-semibold">Géneros: </span>
                {movie?.categories?.join(", ")}
              </p>
              <p className="flex items-center gap-2">
                <Clock3 />
                <span className="text-2xl font-semibold">Duración: </span>
                {movie?.duration ?? "No definido"}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays />
                <span className="text-2xl font-semibold">Año: </span>
                {movie?.year}
              </p>
              <p className="flex items-center gap-2">
                <Eye />
                <span className="text-2xl font-semibold">Vistas: </span>
                {movie?.views}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed">{movie?.description}</p>
        </div>
      </div>

      <div className="w-full lg:w-[35%]">
        <h2 className="mb-2 text-lg font-semibold">Comentarios</h2>
        <div className="flex flex-col justify-between gap-10">
          <CommentForm user={user || undefined} movie={movie || undefined} />
          <CommentScroll comments={comments || []} />
        </div>
      </div>
    </section>
  );
}
