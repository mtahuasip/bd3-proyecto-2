import { FC } from "react";

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div>
      <iframe
        className="h-[500px] w-full rounded-sm"
        src={src}
        loading="lazy"
        title="Description"
        allowFullScreen
      />
    </div>
  );
};
