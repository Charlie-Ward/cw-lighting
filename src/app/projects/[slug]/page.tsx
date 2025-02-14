// app/projects/[slug]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

type ProjectProps = {
  title: string;
  content: string;
  images: string[];
  date: string;
  webDate: string;
  location: string;
  roles: string;
};

const ProjectPage = ({ params }: { params: { slug: string } }) => {
  const [projectData, setProjectData] = useState<ProjectProps | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await fetch(`/api/projects/${params.slug}`);
      if (response.ok) {
        const data = await response.json();
        setProjectData(data);
      } else {
        notFound(); // If no data, show a 404 page
      }
    };

    fetchProjectData();
  }, [params.slug]);

  if (!projectData) return <p>Loading...</p>;

  const { title, content, images, webDate, location, roles } = projectData;

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-white text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-400 mb-4">{webDate} | {location} | {roles}</p>
      <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`${title} image ${index + 1}`} className="w-full h-48 object-cover rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;