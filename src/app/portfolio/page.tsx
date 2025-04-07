//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AutoPlay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";

type Project = {
  title: string;
  slug: string;
  images: string[];
  year: string;
  visible: boolean;
  featured: boolean;
};

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const allProjectsRef = useRef<HTMLDivElement>(null);
  const [showArrow, setShowArrow] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
      
      // Get all featured projects
      const featured = data.filter((project: Project) => project.featured);
      setFeaturedProjects(featured);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (allProjectsRef.current) {
        const rect = allProjectsRef.current.getBoundingClientRect();
        // Check if the top of the All Projects section is in view
        const isInView = rect.top <= window.innerHeight * 0.7;
        
        // Only hide the arrow if it's not the initial load
        if (!isInitialLoad) {
          setShowArrow(!isInView);
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Set initial load to false after a short delay
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 4000);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isInitialLoad]);

  const scrollToAllProjects = () => {
    allProjectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProjectClick = (slug: string, e: React.MouseEvent) => {
    // Stop any event propagation to the carousel
    e.stopPropagation();
    // Navigate programmatically
    router.push(`/projects/${slug}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-white text-4xl font-bold mb-8">My Portfolio</h1>
      
      {/* Featured Projects Carousel - Hidden on mobile */}
      {featuredProjects.length > 0 && (
        <div className="md:block mb-8 w-full max-w-2xl">
          <h2 className="text-xl font-bold text-white mb-3 text-center">Featured Projects:</h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            <Carousel
              opts={{
                loop: true,
              }}
              plugins={[
                AutoPlay({
                  delay: 5000,
                }),
              ]}>
              <CarouselContent>
                {featuredProjects.map((project) => (
                  <CarouselItem key={project.slug}>
                    <div 
                      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full relative"
                    >
                      <div 
                        className="absolute inset-0 z-20 cursor-pointer" 
                        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                        onClick={(e) => handleProjectClick(project.slug, e)}
                      ></div>
                      <Image 
                        src={project.images[0]} 
                        alt={project.title} 
                        width={0} 
                        height={0} 
                        sizes="100vw" 
                        style={{ width: "100%", height: "auto" }} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="p-4">
                        <h2 className="text-white text-xl font-semibold">{project.title}</h2>
                        <p className="text-white">{project.year}</p>
                        <p className="text-blue-400">See More</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 flex items-center justify-between px-2 z-30 pointer-events-none">
                <CarouselPrevious className="static translate-y-0 pointer-events-auto" />
                <CarouselNext className="static translate-y-0 pointer-events-auto" />
              </div>
            </Carousel>
          </div>
        </div>
      )}

      {/* Bouncing Arrow */}
      <AnimatePresence>
        {showArrow && (
          <motion.div 
            className="fixed right-8 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, 10, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.3
              }
            }}
            onClick={scrollToAllProjects}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="40" 
              height="40" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={allProjectsRef}>
        <h2 className='text-xl font-bold text-white mb-3 text-center'>All Projects:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.filter(project => project.visible).map((project: Project) => (
              <div 
                key={project.slug} 
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
              >
                <div 
                  className="absolute inset-0 z-20 cursor-pointer" 
                  onClick={(e) => handleProjectClick(project.slug, e)}
                  style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                ></div>
                <Image src={project.images[0]} alt={project.title} width={0} height={0} sizes='100vw' 
                  style={{ width: "100%", height: "auto" }}
                  className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-white text-xl font-semibold">{project.title}</h2> <p className='text-white'>{project.year}</p>
                  <p className='text-blue-400'>See More</p>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;