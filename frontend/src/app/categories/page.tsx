import { AccessCard } from "@/components/access-card";
import { Card, CardContent } from "@/components/ui/card";
import { getSession } from "@/lib/session";
import { profile } from "@/services/auth";
import { getCategories, getNoAuthCategories } from "@/services/categories";

export default async function Page() {
  const load = async () => {
    try {
      const session = await getSession();
      if (session) {
        const categories = await getCategories();
        const user = await profile();
        return { categories, user };
      } else {
        const categories = await getNoAuthCategories();
        return { categories, user: null };
      }
    } catch (error) {
      console.log(error);
      return { categories: null, user: null };
    }
  };

  const { categories, user } = await load();

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

      {!user && <AccessCard />}
    </section>
  );
}
