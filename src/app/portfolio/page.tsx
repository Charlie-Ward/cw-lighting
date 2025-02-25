//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Project = {
  title: string;
  slug: string;
  images: string[];
  year: string;
  visible: boolean;
};

const Home = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-white text-4xl font-bold mb-8">My Portfolio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.filter(project => project.visible).map((project: Project) => (
          <div key={project.slug} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Image src={project.images[0]} alt={project.title} width={0} height={0} sizes='100vw' 
              style={{ width: "100%", height: "auto" }}
              className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-white text-xl font-semibold">{project.title}</h2> <p className='text-white'>{project.year}</p>
              <Link href={`/projects/${project.slug}`} className='text-blue-400 hover:underline'>
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;