"use client";

import { Textarea } from "@/components/ui/textarea";
import { postComment } from "@/services/comment";
import { CreateComment, createCommentSchema } from "@/types/comment.types";
import { Movie } from "@/types/movies.types";
import { SessionUser } from "@/types/session.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

interface CommentFormProps {
  user?: SessionUser;
  movie?: Movie;
}

function normalizeUser(user?: SessionUser) {
  return {
    ...user,
    streaming_history: user?.streaming_history ?? [],
    created_at: user?.created_at ?? new Date().toISOString(),
    updated_at: user?.updated_at ?? new Date().toISOString(),
    last_login: user?.last_login ?? new Date().toISOString(),
  };
}

export const CommentForm: FC<CommentFormProps> = ({ user, movie }) => {
  const form = useForm<CreateComment>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: { content: "" },
  });
  const { replace } = useRouter();

  const normalizedUser = normalizeUser(user);

  const onSubmit = async (values: CreateComment) => {
    if (values.content === "") {
      toast("No escribiste nada para comentar");
    } else {
      const data = {
        ...values,
        user: normalizedUser,
        movie,
      };

      await postComment(data);
      form.reset();
      replace(`/movies/${movie?.slug}`);
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
