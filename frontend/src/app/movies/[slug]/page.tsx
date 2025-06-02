import { CommentForm } from "@/components/comment-form";
import { CommentScroll } from "@/components/comment-scroll";
import { ReactionButton } from "@/components/reaction-button";
import { VideoPlayer } from "@/components/video-player";
import { profile } from "@/services/auth";
import { updateMovieViewsBySlug } from "@/services/movies";
import { Movie } from "@/types/movies.types";
import { Heart, ListVideo, ThumbsDown, ThumbsUp } from "lucide-react";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{ slug?: string }>;
}

export default async function Page({ params }: PageProps) {
  const path = await params;
  let movie: Movie | null = null;
  const user = await profile();

  try {
    movie = await updateMovieViewsBySlug(path?.slug || "");
  } catch (error) {
    console.log(error);
  }

  const getYouTubeEmbedUrl = (url?: string) => {
    if (!url) return "https://www.youtube.com/embed/19g66ezsKAg";
    const videoId = new URL(url).searchParams.get("v");

    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="flex flex-wrap items-center justify-between gap-4 pt-20 lg:flex-nowrap lg:gap-10 lg:px-16">
      <div className="w-full lg:w-[65%]">
        <h1 className="mb-4 text-center text-2xl font-bold md:text-left lg:mb-4 lg:text-3xl">
          {movie?.title}
        </h1>

        <Suspense fallback={<p>Loading video...</p>}>
          <VideoPlayer src={getYouTubeEmbedUrl(movie?.video_url)} />
        </Suspense>

        <div className="flex justify-center gap-8 py-2">
          <ReactionButton label="Me gusta" Icon={ThumbsUp} />
          <ReactionButton label="No me gusta" Icon={ThumbsDown} />
          <ReactionButton label="Agregar a favoritos" Icon={Heart} />
          <ReactionButton label="Agregar a una lista" Icon={ListVideo} />
        </div>

        <h3 className="text-lg font-semibold">Descripción</h3>
        <p className="text-sm">{movie?.description}</p>
      </div>

      <div className="w-full lg:w-[35%]">
        <h2 className="mb-2 text-lg font-semibold">Comentarios</h2>
        <div className="flex flex-col justify-between gap-10">
          <CommentScroll comments={[]} />

          <CommentForm user={user} movie={movie} />
        </div>
      </div>
    </section>
  );
}
