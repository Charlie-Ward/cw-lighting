//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client';
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useRef, useState, useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import AutoPlay from 'embla-carousel-autoplay'

export default function Home() {
  const SLIDE_COUNT = 12;
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Create a ref for the autoplay plugin
  const autoplayRef = useRef(
    AutoPlay({ delay: 5000, stopOnInteraction: false })
  );
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [autoplayRef.current] // Use the ref here
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (idx: number) => {
    if (emblaApi) {
      // Stop autoplay when user clicks on a dot
      autoplayRef.current.stop();
      emblaApi.scrollTo(idx);
    }
  };


  return (
    <div>
      <section className="">
        <div className="mx-auto max-w-screen-xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.6 },
            }}
          >
            <h1 className="mb-2 text-6xl font-extrabold tracking-tight leading-none text-white md:text-7xl lg:text-8xl dark:text-white">Illuminate</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <p className="text-2xl font-normal text-gray-400 lg:text-3xl sm:px-16 xl:px-48 dark:text-gray-400 pt-4 md:pt-16 mb-4 md:mb-0">
                Welcome to CW Lighting, where creativity meets technical expertise.
              </p>
              <Image
                src="/photos/lthDesk.avif"
                width={540}
                height={960}
                alt="Charlie Ward at a lighting desk"
                className="rounded-full mb-8"
              />
            </div>
          </motion.div>
        </div>
      </section>
      <div className="max-w-[864px] mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.6 },
          }}>
          <div ref={emblaRef} className="px-4 md:px-16 overflow-hidden">
            <div className="flex">
              {Array.from({ length: SLIDE_COUNT }).map((_, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_85%] md:flex-[0_0_60%] mx-2"
                >
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src={`/photos/home/carousel/slide-${index + 1}.avif`}
                      alt={`A Collection of Photos of Charlie's Work`}
                      className="object-cover rounded-xl"
                      layout="fill"
                    />
                  </AspectRatio>
                </div>
              ))}
            </div>
            {/* Dots Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: SLIDE_COUNT }).map((_, idx) => (
                <button
                  key={idx}
                  className={`w-3 h-3 rounded-full ${selectedIndex === idx ? 'bg-amber-500' : 'bg-gray-400'} transition-colors`}
                  onClick={() => scrollTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Buttons Section */}
      <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.6 },
          }}>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8"> {/* Stack buttons on mobile, side by side on larger screens */}
          <Link href="/portfolio" className="flex items-center justify-center bg-gray-300 text-black font-bold py-3 px-32 rounded hover:bg-gray-400 transition duration-200 w-full sm:w-auto">
            See My Work
          </Link>
          <Link href="/contact" className="flex items-center justify-center bg-gray-300 text-black font-bold py-3 px-32 rounded hover:bg-gray-400 transition duration-200 w-full sm:w-auto">
            Get In Touch
          </Link>
        </div>
      </motion.div>

      <div className="max-w-[864px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.6 },
          }}>
          <section>
            <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 py-8 lg:py-16">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none text-white">
                  About
                </h1>
                <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-400">
                  Charlie Ward is a theatre technician based in the Leicestershire area. Experienced in both theatre and other types of stage entertainment he is the go-to place for all your technical needs. With training on both EOS and MagicQ lighting boards, Charlie is well equipped to handle most lighting solutions.
                </p>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src="/photos/home/mamma_mia.avif"
                    alt="mockup"
                    className="rounded-3xl"
                    layout="fill"
                  />
                </AspectRatio>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}