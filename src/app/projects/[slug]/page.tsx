//page.tsx
//Copyright (C) 2025  Charlie Ward GPL v3
//Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/modal'; // Import the Modal component
import { useParams } from 'next/navigation'; // Import useParams
import Image from 'next/image';
import { ZoomIn, ArrowBigLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ProjectProps = {
  title: string;
  content: string;
  images: string[];
  date: string;
  location: string;
  roles: string;
  webDate: string;
  visible: boolean;
};

const ProjectPage = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [projectData, setProjectData] = useState<ProjectProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await fetch(`/api/projects/${slug}`);
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Set the error message from the response
        return;
      }
      const data = await response.json();
      setProjectData(data);
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

  if (errorMessage) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center space-y-4'>
        <p className="text-white text-xl font-bold">{errorMessage}</p>
        <Button>
          <Link href='/portfolio' className="flex items-center">
            <ArrowBigLeft className="inline-block" />
            <span className="pl-4">Go Back</span>
          </Link>
        </Button>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center space-y-4'>
        <p className="text-white text-xl font-bold">Loading...</p>
      </div>
    );
  }

  const { title, content, images, location, roles, webDate, visible } = projectData;

  if (!visible) {
    return(
      <div className='min-h-screen flex flex-col items-center justify-center space-y-4'>
        <p className="text-white text-xl font-bold">This project is not currently publicly available.</p>
        <Button>
          <Link href='/portfolio' className="flex items-center">
            <ArrowBigLeft className="inline-block" />
            <span className="pl-4">Go Back</span>
          </Link>
        </Button>
      </div>  
    )
  }

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
            alt={`${title}: Image ${index + 1}`} 
            className="w-full h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(index)} 
            width={0} height={0} 
            sizes='100vw' 
          />
        ))}
      </div>
      <div className='flex items-center text-gray-400'>
        <ZoomIn />
        <p className='pl-4'>Click on each image to see it in full screen</p>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        imageUrl={images[selectedImageIndex || 0]} // Pass the current image
        currentIndex={selectedImageIndex || 0} // Pass the current image index
        totalImages={images.length} // Pass the total number of images
        onPrevImage={prevImage} // Pass the function to go to the previous image
        onNextImage={nextImage} // Pass the function to go to the next image
        showName={title}
      />
    </div>
  );
};

export default ProjectPage;