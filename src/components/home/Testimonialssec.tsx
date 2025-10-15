"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSellersOptions } from "@/services/Home/Sellers/queries";
import { Sellers } from "@/types/home/hometypes";
import Link from "next/link";

export default function TestimonialsSection() {
  const { data, isLoading, isError, error } = useQuery(getSellersOptions());
  const [activeTestimonial, setActiveTestimonial] = useState<Sellers | null>(
    null
  );

  // URL'den https:// kısmını kaldıran fonksiyon
  const removeProtocol = (url: string) => {
    if (!url) return "";
    return url.replace(/^https?:\/\//, "");
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setActiveTestimonial(data[0]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section>
      <div>
        <div className="text-start mb-12 max-w-lg">
          <h2 className="text-3xl lg:text-[40px] font-medium text-gray-900 mb-4">
            <span className="text-[#E23359]">Shoplink</span> icmasının
            satıcıları ilə tanış olun!
          </h2>
        </div>

        <div className="mb-[36px]">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {data?.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(testimonial)}
                className={`relative cursor-pointer rounded-[8px] overflow-hidden transition-all duration-300 w-full h-[80px] md:h-[165px] ${
                  activeTestimonial?.name === testimonial.name
                    ? ""
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <Image
                  src={testimonial.thumb_image || "/placeholder.svg"}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {activeTestimonial && (
          <div>
            <div className="overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <div className=" w-full h-full md:w-[510px] md:h-[300px] overflow-hidden rounded-lg">
                    <Image
                      src={activeTestimonial.image || "/placeholder.svg"}
                      alt={activeTestimonial.name}
                      width={510}
                      height={305}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className=" p-0 lg:p-12 flex flex-col justify-between md:mt-0 mt-4 ">
                  <blockquote className="text-lg lg:text-xl text-gray-700 mb-6 leading-relaxed">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: activeTestimonial.description || "",
                      }}
                    />
                  </blockquote>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {activeTestimonial.name}
                    </h3>

                    <Link
                      href={activeTestimonial.link || "#"}
                      className="text-[#E23359] font-medium"
                      target="_blank"
                    >
                      {removeProtocol(activeTestimonial.link)}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
