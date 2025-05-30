import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateMovieViewsBySlug } from "@/services/movies";
import { Movie } from "@/types/movies.types";

interface PageProps {
  params: Promise<{ slug?: string }>;
}

export default async function Page({ params }: PageProps) {
  const path = await params;
  let movie: Movie | null = null;

  try {
    movie = await updateMovieViewsBySlug(path?.slug || "");
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="px-16">
      <div className="flex items-center justify-center pt-20">
        <Card className="max-w-1/2">
          <CardHeader>
            <CardTitle className="text-sm">Movie Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted overflow-auto rounded p-2 font-mono text-xs break-words whitespace-pre-wrap">
              {JSON.stringify(movie, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
