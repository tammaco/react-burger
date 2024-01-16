import { useState, useCallback } from "react";

export const useModal = (customOnCloseFunction: () => void) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (customOnCloseFunction && typeof(customOnCloseFunction) === 'function')
      customOnCloseFunction();
    
    setIsModalOpen(false);
  }, [customOnCloseFunction]);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};