"use client";

import { setSession } from "@/lib/session";
import { cn, parseError } from "@/lib/utils";
import { register } from "@/services/auth";
import { Register, registerSchema } from "@/types/auth.types";
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

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const router = useRouter();
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorTimer, setErrorTimer] = useState<NodeJS.Timeout | null>(null);
  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeat_password: "",
      roles: ["user"],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: Register) => {
    try {
      const response = await register(values);
      await setSession(response);
      form.reset();
      toast("¡Registro exitoso! Iniciando sesión.");
      router.push("/movies");
    } catch (error) {
      const parsed = parseError(error as Error);

      setErrorStatus(parsed.status);
      setErrorMessage(parsed.message);

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
          <CardTitle className="text-2xl">Crea tu cuenta</CardTitle>
          <CardDescription>Llena todos los campos</CardDescription>

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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
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
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Escribe una contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="repeat_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Repite la contraseña "
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Registrarse
                </Button>
                <Button variant="outline" className="w-full">
                  Registrarse con Google
                </Button>
              </div>

              <div className="mt-4 text-center text-sm">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Ingresa
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
