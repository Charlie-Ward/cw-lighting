'use client'
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {motion} from "framer-motion";
import AutoPlay from "embla-carousel-autoplay"


export default function Home() {
  return (
    <div>
      <section className="">
        <div className=" mx-auto max-w-screen-xl text-center  ">
            <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.6 },
            }}>
              <h1 className="mb-4 text-6xl font-extrabold tracking-tight leading-none text-white md:text-7xl lg:text-8xl dark:text-white">Illuminate</h1>
              <div className="grid grid-cols-4 grid-rows-2 gap-0">
                <p className=" text-2xl font-normal text-gray-400 lg:text-3xl sm:px-16 xl:px-48 dark:text-gray-400 col-span-2 pt-16">Welcome to CW Lighting, where creativity meets technical expertise.</p>
                <Image src="/photos/lthDesk.jpeg" width={540} height={960} alt="Charlie Ward at a lighting desk" className="col-span-2 row-span-2 col-start-3 rounded-full"/>
              </div>
            </motion.div>
        </div>
    </section>
      <div className="max-w-[864px] mx-auto pb-32">
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.6 },
          }}>
          <Carousel
            opts={{
              loop: true
            }}
            plugins={[
              AutoPlay({
                delay: 5000,
              })
          ]}>
            <CarouselContent>
              <CarouselItem>
                <AspectRatio ratio={16/9}>
                  <img src="/photos/carousel/slide-1.jpeg" alt="A Gobo on a curtain"/>
                </AspectRatio>
              </CarouselItem>
              <CarouselItem>
                <AspectRatio ratio={16/9}>
                  <img src="/photos/carousel/slide-2.jpeg" alt="A Gobo on a curtain"/>
                </AspectRatio>
              </CarouselItem>
              <CarouselItem>
                <AspectRatio ratio={16/9}>
                  <img src="/photos/carousel/slide-3.JPG" alt="A Gobo on a curtain"/>
                </AspectRatio>
              </CarouselItem>
              <CarouselItem>
                <AspectRatio ratio={16/9}>
                  <img src="/photos/carousel/slide-4.jpeg" alt="A Gobo on a curtain"/>
                </AspectRatio>
              </CarouselItem>
              <CarouselItem>
                <AspectRatio ratio={16/9}>
                  <img src="/photos/carousel/slide-5.jpeg" alt="A Gobo on a curtain"/>
                </AspectRatio>
              </CarouselItem>
              <CarouselItem>
                <AspectRatio ratio={16/9}>
                  <img src="/photos/carousel/slide-6.jpeg" alt="A Gobo on a curtain"/>
                </AspectRatio>
              </CarouselItem>
              <CarouselItem>
                <AspectRatio ratio={16/9}>
                  <img src="/photos/carousel/slide-7.jpeg" alt="A Gobo on a curtain"/>
                </AspectRatio>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext />
          </Carousel>
        </motion.div>
      </div>
    </div>
  );
}
