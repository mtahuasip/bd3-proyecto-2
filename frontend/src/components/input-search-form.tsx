"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FormSchema = z.object({
  query: z.string().min(2, {
    message: "Este campo es obligatorio",
  }),
});

export function InputSearchForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast(JSON.stringify(data));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-4"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Titulo o categoría</FormLabel>
              <FormControl>
                <Input
                  placeholder="Los Vengadores, Acción, Súper Heroes"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Puedes escribir el titulo o categoría.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="-mt-1.5" type="submit">
          Buscar
        </Button>
      </form>
    </Form>
  );
}
