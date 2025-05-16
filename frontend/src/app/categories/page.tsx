import { Card, CardContent } from "@/components/ui/card";
import { getCategoriesRequest } from "@/services/categories";

export default async function Page() {
  const categories = await getCategoriesRequest();

  return (
    <section className="px-16 pt-20 pb-8">
      <h1 className="mb-10 text-center text-5xl font-bold">Categorías</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map(
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
    </section>
  );
}
