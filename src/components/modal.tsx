// modal.tsx
// Copyright (C) 2025  Charlie Ward GPL v3
// Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

import React, { useEffect } from 'react';
import Image from 'next/image';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onPrevImage: () => void;
  onNextImage: () => void;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl, onPrevImage, onNextImage }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        onPrevImage();
      } else if (event.key === 'ArrowRight') {
        onNextImage();
      } else if (event.key === 'Escape') {
        onClose(); // Close modal on Escape key
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

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
      <div className="relative w-3/4 h-3/4">
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <button
          className="absolute top-1/2 left-4 text-white text-4xl"
          onClick={onPrevImage}
        >
          &lt;
        </button>
        <button
          className="absolute top-1/2 right-4 text-white text-4xl"
          onClick={onNextImage}
        >
          &gt;
        </button>
        <Image
          src={imageUrl}
          alt="Fullscreen"
          className="w-full h-full object-contain"
          layout='fill'
        />
      </div>
    </div>
  );
};

export default Modal;