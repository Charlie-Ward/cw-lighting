// modal.tsx
// Copyright (C) 2025  Charlie Ward GPL v3
// Full License @ https://github.com/Charlie-Ward/cw-lighting/blob/main/LICENSE

import React, { useEffect } from 'react';
import Image from 'next/image';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl }) => {
  // Always call useEffect at the top level
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array to run once on mount/unmount

  // Render nothing if the modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative w-3/4 h-3/4">
        <button
          className="absolute top-2 right-2 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <Image
          src={imageUrl}
          alt="Fullscreen"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default Modal;