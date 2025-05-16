import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";

export default function Page() {
  const playlists = [
    {
      _id: "1",
      name: "Favoritas de acción",
      description: "Películas con mucha adrenalina y emoción.",
      user: {},
      visibility: true,
      movies: [],
      created_at: new Date("2025-05-15"),
      updated_at: new Date("2025-05-15"),
    },
    {
      _id: "2",
      name: "Dramas intensos",
      description: "Películas que te hacen llorar.",
      user: {},
      visibility: false,
      movies: [],
      created_at: new Date("2025-05-12"),
      updated_at: new Date("2025-05-12"),
    },
  ];

  // const toggleVisibility = (id: string) => {
  //   setPlaylists((prev) =>
  //     prev.map((playlist) =>
  //       playlist._id === id
  //         ? { ...playlist, visibility: !playlist.visibility }
  //         : playlist
  //     )
  //   );
  // };

  return (
    <section className="px-40 pt-20 pb-8">
      <h1 className="mb-10 text-center text-5xl font-bold">Tus favoritos</h1>

      <div className="flex flex-wrap items-center gap-10">
        {playlists.map((playlist) => (
          <Card key={playlist._id} className="w-full md:w-[300px]">
            <CardContent className="space-y-3 p-4">
              <h2 className="text-xl font-semibold">{playlist.name}</h2>
              <p className="text-muted-foreground text-sm">
                {playlist.description}
              </p>
              <p className="text-xs text-gray-500">
                Creado el: {playlist.created_at.toLocaleDateString()}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm">Pública</span>
                {/* <Switch
                  checked={playlist.visibility}
                  onCheckedChange={() => toggleVisibility(playlist._id)}
                /> */}
                <Switch checked={playlist.visibility} />
              </div>

              <Button className="mt-2 w-full" asChild>
                <Link href={`/playlist/${playlist._id}`}>
                  Ver películas de la lista
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
