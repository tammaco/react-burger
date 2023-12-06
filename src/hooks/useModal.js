import { useState, useCallback } from "react";

export const useModal = (customOnCloseFunction) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (customOnCloseFunction && typeof(customOnCloseFunction) === 'function')
      customOnCloseFunction();
    
    setIsModalOpen(false);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};