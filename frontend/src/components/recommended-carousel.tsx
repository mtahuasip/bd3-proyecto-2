"use client";

import { Movie } from "@/types/movies";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

interface RecommendedCarouselProps {
  movies: Movie[];
}

export const RecommendedCarousel: FC<RecommendedCarouselProps> = ({
  movies,
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateSelection();

    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <div className="relative max-h-[580px] w-full">
      <div className="top-o absolute left-0 z-10 flex h-full w-full items-center justify-between px-5">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            carouselApi?.scrollPrev();
          }}
          disabled={!canScrollPrev}
        >
          <ChevronLeft />
        </Button>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => {
            carouselApi?.scrollNext();
          }}
          disabled={!canScrollNext}
        >
          <ChevronRight />
        </Button>
      </div>

      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 10000 }), Fade()]}
      >
        <CarouselContent>
          {movies.map((movie) => (
            <CarouselItem key={movie._id}>
              <div className="relative">
                <Image
                  className="h-[580px] w-full object-cover"
                  src={movie.cover_url}
                  alt={`Portada de la película ${movie.title}`}
                  width={1080}
                  height={720}
                />
                <div className="absolute bottom-0 left-0 grid grid-cols-6 grid-rows-1 items-end justify-between gap-8 px-6 py-4">
                  <div className="col-span-5">
                    <h2 className="mb-2 text-3xl font-bold">{movie.title}</h2>
                    <p className="line-clamp-3 text-lg">{movie.description}</p>
                  </div>
                  <div className="z-10 col-span-1 pb-2">
                    <Button asChild>
                      <Link href={`/movies/${movie.slug}`}>Ver película</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
