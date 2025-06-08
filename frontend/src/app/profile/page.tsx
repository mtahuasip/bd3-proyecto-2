import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/session";
import { profile } from "@/services/auth";
import { format } from "date-fns";
import { CalendarIcon, LogInIcon, MailIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const load = async () => {
    try {
      const session = await getSession();
      if (session) {
        const user = await profile();

        return { user };
      } else {
        return { user: null };
      }
    } catch (error) {
      console.log(error);
      return { user: null };
    }
  };

  const { user } = await load();

  return (
    <section className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="border-none shadow-xl">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <UserIcon className="h-6 w-6" /> Datos de usuario
            </CardTitle>
            <Button variant="link" size="icon" asChild>
              <Link href="/update-profile">Editar</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">Nombre de usuario</p>
              <p className="text-lg font-medium capitalize">{user?.username}</p>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">
                Correo electrónico
              </p>
              <div className="flex items-center gap-2">
                <MailIcon className="text-muted-foreground h-4 w-4" />
                <p className="text-base">{user?.email}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">Fecha de registro</p>
              <div className="flex items-center gap-2">
                <CalendarIcon className="text-muted-foreground h-4 w-4" />
                <p className="text-base">
                  {format(
                    new Date(user?.created_at || new Date()),
                    "dd/MM/yyyy HH:mm"
                  )}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">Último acceso</p>
              <div className="flex items-center gap-2">
                <LogInIcon className="text-muted-foreground h-4 w-4" />
                <p className="text-base">
                  {format(
                    new Date(user?.last_login || new Date()),
                    "dd/MM/yyyy HH:mm"
                  )}
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-1">
              <p className="text-muted-foreground text-sm">
                Historial de streaming
              </p>
              {user?.streaming_history === null ||
              user?.streaming_history.length === 0 ? (
                <Badge variant="outline" className="text-muted-foreground">
                  Vacío
                </Badge>
              ) : (
                <ul className="list-inside list-disc">
                  {user?.streaming_history.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
