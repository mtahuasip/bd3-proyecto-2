import { AccessCard } from "@/components/access-card";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/session";
import { getCategories, getCategoriesSamples } from "@/services/categories";

export default async function Page() {
  const session = await getSession();
  const headers = session ?? undefined;

  let categories;

  try {
    if (session) {
      categories = await getCategories(headers);
    } else {
      categories = await getCategoriesSamples(12);
    }
  } catch {
    throw new Error("Fallo al cargar los datos");
  }

  return (
    <section className="px-16 pt-20 pb-8">
      <h1 className="mb-10 text-center text-5xl font-bold">Categorías</h1>

      <div className="mt-6 mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories?.map(
          (category: { _id: string; name: string; description: string }) => (
            <Card
              key={category._id}
              className="transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-4">
                <h2 className="mb-2 text-xl font-semibold">{category.name}</h2>
                <p className="text-muted-foreground text-sm">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {!session && <AccessCard />}
    </section>
  );
}
