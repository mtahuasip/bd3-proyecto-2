import { CommentType } from "@/types/comment.types";
import { format } from "date-fns";
import { FC } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface CommentScrollProps {
  comments?: CommentType[];
}

export const CommentScroll: FC<CommentScrollProps> = ({ comments }) => {
  return (
    <ScrollArea className="h-[700px]">
      {comments?.length === 0 && (
        <p className="text-center text-xs font-light md:text-lg">
          Todavía no hay comentarios, sé el primero en comentar.
        </p>
      )}
      <div className="flex flex-col gap-2">
        {comments?.map((comment) => (
          <div key={comment._id} className="rounded-md border p-2">
            <h6 className="mb-1 text-sm font-semibold">
              {comment.user.username}
            </h6>
            <p className="text-xs">{comment.content}</p>
            <div>
              <span className="text-right text-xs">
                Fecha:
                {format(
                  new Date(comment?.created_at || new Date()),
                  "dd/MM/yyyy HH:mm"
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
