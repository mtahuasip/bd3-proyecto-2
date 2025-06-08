"use client";

import { setSession } from "@/lib/session";
import { cn, parseError } from "@/lib/utils";
import { login } from "@/services/auth";
import { Login, loginSchema } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { AlertMessage } from "./alert-message";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorTimer, setErrorTimer] = useState<NodeJS.Timeout | null>(null);
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: Login) => {
    try {
      const response = await login(values);
      await setSession(response);
      form.reset();
      toast("Se ha iniciado sesión correctamente");
      router.push("/movies");
    } catch (error) {
      const parsed = parseError(error as Error);

      setErrorStatus(parsed.status);
      setErrorMessage(parsed.message.split(".")[0]);

      if (errorTimer) clearTimeout(errorTimer);

      const timer = setTimeout(() => {
        setErrorStatus(null);
        setErrorMessage(null);
      }, 5000);

      setErrorTimer(timer);
    }
  };

  useEffect(() => {
    return () => {
      if (errorTimer) clearTimeout(errorTimer);
    };
  }, [errorTimer]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
          <CardDescription>Accede a tu cuenta con tu correo</CardDescription>

          {errorMessage && (
            <div className="mt-4">
              <AlertMessage status={errorStatus || 0} message={errorMessage} />
            </div>
          )}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Contraseña</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="text-sm underline-offset-4 hover:underline"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Escribe tu contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Ingresar
                </Button>
                <Button variant="outline" className="w-full">
                  Ingresar con Google
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Registrarse
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
