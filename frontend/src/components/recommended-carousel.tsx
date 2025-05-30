"use client";

import { Movie } from "@/types/movies.types";
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
  movies?: Movie[];
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
      <div className="pointer-events-none absolute top-0 left-0 z-10 flex h-full w-full items-center justify-between px-5">
        <Button
          size="icon"
          variant="ghost"
          className="pointer-events-auto"
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
          className="pointer-events-auto"
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
          {movies?.map((movie) => (
            <CarouselItem key={movie._id}>
              <div className="relative">
                <Image
                  className="-z-10 h-[500px] w-full rounded-sm object-cover brightness-50"
                  src={movie.cover_url || "/images/herp-bg.webp"}
                  alt={`Portada de la película ${movie.title}`}
                  width={1080}
                  height={720}
                />

                <div className="absolute bottom-0 left-0 grid justify-between bg-black/5 px-6 py-4 md:grid-cols-6 md:grid-rows-1 md:items-end lg:gap-8">
                  <div className="mb-2 text-white md:col-span-5 lg:mb-0">
                    <h2 className="mb-2 text-xl font-bold lg:text-3xl">
                      {movie.title}
                    </h2>
                    <p className="line-clamp-3 text-sm lg:text-lg">
                      {movie.description ||
                        "Esta película no cuenta con una descripción, por favor espera que se actualice. Disculpas."}
                    </p>
                  </div>
                  <div className="z-30 ml-auto pb-2 md:col-span-1">
                    <Button asChild variant="outline">
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
