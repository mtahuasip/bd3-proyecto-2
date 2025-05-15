"use client";

import { cn } from "@/lib/utils";
import { changePasswordRequest } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
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

const formSchema = z
  .object({
    old_password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres"),
    new_password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres"),
    repeat_password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres"),
  })
  .refine((data) => data.new_password === data.repeat_password, {
    message: "Las contraseñas no coinciden",
    path: ["repeat_password"],
  });

export function ChangePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { old_password: "", new_password: "", repeat_password: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await changePasswordRequest(values);
      toast(response.message);
      form.reset();
    } catch (error: any) {
      toast(error.message || "Ocurrió un error inesperado");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Cambiar contraseña</CardTitle>
          <CardDescription>Todos los campos son requeridos</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Actual contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Escribe tu actual contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nueva contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Escribe tu nueva contraseña"
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
                      <FormLabel>Repite tu nueva contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Repite tu nueva contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Guardar cambios
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
