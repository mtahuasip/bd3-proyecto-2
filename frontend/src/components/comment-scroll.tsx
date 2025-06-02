import { format } from "date-fns";
import { FC } from "react";
import { ScrollArea } from "./ui/scroll-area";

interface CommentScrollProps {
  comments: { id: number; user: string; content: string; createdAt: Date }[];
}

export const CommentScroll: FC<CommentScrollProps> = ({ comments }) => {
  comments = [
    {
      id: 1,
      user: "user 1",
      content:
        "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam officiis fugit, nostrum quidem incidunt, corporis velit atque a, dolorum laborum ducimus quam sunt optio libero voluptas unde accusantium? Quae.",
      createdAt: new Date(),
    },
    {
      id: 2,
      user: "user 1",
      content:
        "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam officiis fugit, nostrum quidem incidunt, corporis velit atque a, dolorum laborum ducimus quam sunt optio libero voluptas unde accusantium? Quae.",
      createdAt: new Date(),
    },
    {
      id: 3,
      user: "user 1",
      content:
        "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam officiis fugit, nostrum quidem incidunt, corporis velit atque a, dolorum laborum ducimus quam sunt optio libero voluptas unde accusantium? Quae.",
      createdAt: new Date(),
    },
    {
      id: 4,
      user: "user 1",
      content:
        "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam officiis fugit, nostrum quidem incidunt, corporis velit atque a, dolorum laborum ducimus quam sunt optio libero voluptas unde accusantium? Quae.",
      createdAt: new Date(),
    },
    {
      id: 5,
      user: "user 1",
      content:
        "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam officiis fugit, nostrum quidem incidunt, corporis velit atque a, dolorum laborum ducimus quam sunt optio libero voluptas unde accusantium? Quae.",
      createdAt: new Date(),
    },
    {
      id: 6,
      user: "user 1",
      content:
        "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis aliquam officiis fugit, nostrum quidem incidunt, corporis velit atque a, dolorum laborum ducimus quam sunt optio libero voluptas unde accusantium? Quae.",
      createdAt: new Date(),
    },
  ];

  return (
    <ScrollArea className="h-[450px]">
      <div className="flex flex-col gap-2">
        {comments?.map((comment) => (
          <div key={comment.id} className="rounded-md border p-2">
            <h6 className="mb-1 text-sm font-semibold">{comment.user}</h6>
            <p className="text-xs">{comment.content}</p>
            <div>
              <span className="text-right text-xs">
                Fecha:
                {format(
                  new Date(comment?.createdAt || new Date()),
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
