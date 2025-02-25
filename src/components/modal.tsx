// modal.tsx
// Copyright (C) 2025  Charlie Ward GPL v3
// Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

// This is now

import React, { useEffect } from 'react';
import Image from 'next/image';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  currentIndex: number;
  totalImages: number;
  onPrevImage: () => void;
  onNextImage: () => void;
  showName: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl, currentIndex, totalImages, onPrevImage, onNextImage, showName }) => {
  // Always call useEffect at the top level
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        onPrevImage();
      } else if (event.key === 'ArrowRight') {
        onNextImage();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onPrevImage, onNextImage, onClose]);

  // Render nothing if the modal is not open
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal only if the overlay is clicked
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleOverlayClick}>
      <div className="relative w-3/4 h-3/4 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={`${showName}: Image ${currentIndex + 1}`} 
          className="w-full h-full object-contain"
          layout='fill'
          priority
          style={{ pointerEvents: 'none' }}
        />
        <button
          className="absolute top-1/2 left-4 text-white text-4xl z-50 transform -translate-y-1/2"
          onClick={onPrevImage}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-4 text-white text-4xl z-50 transform -translate-y-1/2"
          onClick={onNextImage}
          disabled={currentIndex === totalImages - 1}
        >
          &gt;
        </button>
        <button
          className="absolute top-2 right-2 text-white text-2xl z-50"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Modal;