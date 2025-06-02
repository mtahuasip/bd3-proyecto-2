import { CommentForm } from "@/components/comment-form";
import { CommentScroll } from "@/components/comment-scroll";
import { ReactionButton } from "@/components/reaction-button";
import { Separator } from "@/components/ui/separator";
import { VideoPlayer } from "@/components/video-player";
import { profile } from "@/services/auth";
import { getCommentsByMovie } from "@/services/comment";
import { updateMovieViewsBySlug } from "@/services/movies";
import { Heart, ListVideo, ThumbsDown, ThumbsUp } from "lucide-react";
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

    const comments = await getCommentsByMovie(movie._id);

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
    <section className="flex flex-wrap items-center justify-between gap-4 px-4 pt-20 md:px-8 lg:flex-nowrap lg:gap-10 lg:px-16">
      <div className="w-full lg:w-[65%]">
        <h1 className="mb-1 text-center text-lg font-bold md:mb-4 md:text-left md:text-2xl lg:mb-4 lg:text-3xl">
          {movie?.title}
        </h1>
        <Separator />

        <div className="mb-2 md:mb-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">
              {movie?.categories.join(", ")}
            </p>
            <div>
              <span className="mr-2 text-xs font-semibold">Duración:</span>
              <span className="text-muted-foreground text-xs font-bold sm:text-sm">
                {movie?.duration || "No disponible"}
              </span>
            </div>
          </div>
          <Separator />

          <p className="text-sm">{movie?.description}</p>
        </div>

        <Suspense fallback={<p>Loading video...</p>}>
          <VideoPlayer src={getYouTubeEmbedUrl(movie?.video_url)} />
        </Suspense>

        <div className="flex items-start justify-center gap-4 py-2 md:gap-8">
          <ReactionButton label="Me gusta" Icon={ThumbsUp} />
          <ReactionButton label="No me gusta" Icon={ThumbsDown} />
          <ReactionButton label="Agregar a favoritos" Icon={Heart} />
          <ReactionButton label="Agregar a una lista" Icon={ListVideo} />
        </div>
      </div>

      <div className="w-full lg:w-[35%]">
        <h2 className="mb-2 text-lg font-semibold">Comentarios</h2>
        <div className="flex flex-col justify-between gap-10">
          <CommentScroll comments={comments || []} />

          <CommentForm user={user || undefined} movie={movie || undefined} />
        </div>
      </div>
    </section>
  );
}
