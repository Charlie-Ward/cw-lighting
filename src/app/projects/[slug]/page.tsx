//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Modal from '@/components/modal'; // Import the Modal component
import { useParams } from 'next/navigation'; // Import useParams

type ProjectProps = {
  title: string;
  content: string;
  images: string[];
  date: string;
  location: string;
  roles: string;
  webDate: string;
};

const ProjectPage = () => {
  const { slug } = useParams(); // Unwrap params using useParams
  const [projectData, setProjectData] = useState<ProjectProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await fetch(`/api/projects/${slug}`); // Fetch data from the API
      if (response.ok) {
        const data = await response.json();
        setProjectData(data);
      } else {
        notFound(); // If no data, show a 404 page
      }
    };

    fetchProjectData();
  }, [slug]);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (!projectData) return <p className="text-white">Loading...</p>;

  const { title, content, images, location, roles, webDate } = projectData;

  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <h1 className="text-white text-4xl font-bold mb-4">{title}</h1>
      <p className="text-gray-400 mb-4">{webDate} | {location} | {roles}</p>
      <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`${title} image ${index + 1}`} 
            className="w-full h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(img)} 
          />
        ))}
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        imageUrl={selectedImage || ''} 
      />
    </div>
  );
};

export default ProjectPage;