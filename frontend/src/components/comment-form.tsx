"use client";

import { Textarea } from "@/components/ui/textarea";
import { postComment } from "@/services/comment";
import { commentSchema, CreateComment } from "@/types/comment.types";
import { Movie } from "@/types/movies.types";
import { SessionUser } from "@/types/session.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

interface CommentFormProps {
  user: SessionUser;
  movie: Movie;
}

export const CommentForm: FC<CommentFormProps> = ({ user, movie }) => {
  const form = useForm<CreateComment>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  console.log(form.getValues());

  const onSubmit = async (values: CreateComment) => {
    if (values.content === "") {
      const data = {
        ...values,
        user,
        movie,
      };

      console.log(data);
      console.log(values);
      console.log("vacio");
      toast("No hay nada para comentar");
    } else {
      const data = {
        ...values,
        user,
        movie,
      };
      await postComment(data);
      console.log(data);
      console.log(values);
      console.log("datos");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Escribe algo sobre esta película"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex justify-end">
          <Button type="submit">Comentar</Button>
        </div>
      </form>
    </Form>
  );
};
