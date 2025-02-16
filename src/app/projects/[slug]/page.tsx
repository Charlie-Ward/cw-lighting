//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Modal from '@/components/modal'; // Import the Modal component
import { useParams } from 'next/navigation'; // Import useParams
import Image from 'next/image';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    if (projectData && selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % projectData.images.length);
    }
  };

  const prevImage = () => {
    if (projectData && selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + projectData.images.length) % projectData.images.length);
    }
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
          <Image 
            key={index} 
            src={img} 
            alt={`${title} image ${index + 1}`} 
            className="w-full h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(index)} 
            width={0} height={0} 
            sizes='100vw' 
          />
        ))}
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        imageUrl={images[selectedImageIndex || 0]} // Pass the current image
        onPrevImage={prevImage} // Pass the function to go to the previous image
        onNextImage={nextImage} // Pass the function to go to the next image
      />
    </div>
  );
};

export default ProjectPage;