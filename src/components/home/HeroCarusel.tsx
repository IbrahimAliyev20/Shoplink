"use client";

import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import Link from "next/link"; 
import { useQuery } from "@tanstack/react-query"; 
import { getHeroBannerOptions } from "@/services/Home/Hero/queries";


export default function HeroCarousel() {
  const [emblaRefTop] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const [emblaRefBottom] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        direction: "backward",
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );
  const { data, isLoading, isError, error } = useQuery(getHeroBannerOptions());

  if (isLoading) {
    return (
      <main className="flex-1">
        <div className="flex justify-center items-center min-h-[600px]">
          <p className="text-xl">Məlumatlar yüklənir...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex-1">
        <div className="flex justify-center items-center min-h-[600px]">
          <p className="text-xl text-red-500">
            Xəta baş verdi: {error.message}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12 min-h-[500px] lg:min-h-[600px]">
          <div className="w-full lg:w-2/5 space-y-4 lg:space-y-6 lg:pr-8 mt-20 md:mt-0">
            <h1 className="max-w-[300px]  text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold text-gray-900 leading-tight">
              {data?.title}
            </h1>

            <p className="text-base   text-[#565355] leading-relaxed font-regular">
              {data?.description}
            </p>

            <Link
              href={data?.btn_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#E23359] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-2xl font-medium text-base  hover:from-pink-600 hover:to-purple-700 duration-300 flex items-center gap-2 group shadow-lg hover:shadow-xl cursor-pointer">
                {data?.btn_text}
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>
          </div>

          <div className="w-full lg:w-3/5 h-[300px] sm:h-[350px] lg:h-[440px]">
            <div className="relative w-full h-full space-y-0 md:space-y-8">
              <div
                className="h-[48%] overflow-hidden rounded-2xl relative"
                ref={emblaRefTop}
              >
                <div className="flex h-full">
                  {data?.images.map((image, index) => (
                    <div
                      key={`top-${index}`}
                      className="flex-[0_0_60%] min-w-0 px-3"
                    >
                      <div className="relative h-[120px] md:h-[212px] overflow-hidden rounded-xl group">
                        <Image
                          src={image.image || "/placeholder.svg"}
                          alt="Hero Banner"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        </div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-0 top-0 w-[150px] sm:w-[100px] lg:w-[250px] h-full bg-gradient-to-r from-white/60 via-white/10 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 w-[150px] sm:w-[100px] lg:w-[250px] h-full bg-gradient-to-l from-white/60 via-white/10 to-transparent pointer-events-none z-10" />
              </div>

              <div
                className="h-[48%] overflow-hidden rounded-2xl relative"
                ref={emblaRefBottom}
              >
                <div className="flex h-full">
                  {data?.images.map((image, index) => (
                    <div
                      key={`bottom-${index}`}
                      className="flex-[0_0_60%] min-w-0 px-3"
                    >
                      <div className="relative h-[120px] md:h-[212px] overflow-hidden rounded-xl group">
                        <Image
                          src={image.image || "/placeholder.svg"}
                          alt="Hero Banner"
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-0 top-0 w-[150px] sm:w-[100px] lg:w-[250px] h-full bg-gradient-to-r from-white/60 via-white/10 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 w-[150px] sm:w-[100px] lg:w-[250px] h-full bg-gradient-to-l from-white/60 via-white/10 to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
