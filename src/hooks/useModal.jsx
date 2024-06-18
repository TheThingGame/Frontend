import { useState, useRef } from "react";

const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); 
  const ref = useRef(null);

  const toggleModal = () => {
    if (!ref.current) return;

    if (showModal) {
      if (isBlocked) return; 
      setShowModal(false);
      ref.current.close();
      setIsBlocked(false); 
    } else {
      setShowModal(true);
      ref.current.showModal();
      setIsBlocked(false); 
    }
  };

  return {
    showModal,
    toggleModal,
    ref,
    isBlocked
  };
};

export default useModal;
