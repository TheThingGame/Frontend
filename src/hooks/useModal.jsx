import {useState, useRef} from "react";

const useModal = (blocked = false) => {
  const [showModal, setShowModal] = useState(false);
  const [isBlocked, setIsBlocked] = useState(blocked);
  const ref = useRef(null);

  const toggleModal = () => {
    if (!ref.current) return;

    if (showModal) {
      setShowModal(false);
      ref.current.close();
    } else {
      setShowModal(true);
      ref.current.showModal();
    }
  };

  return {
    showModal,
    toggleModal,
    ref,
    isBlocked,
  };
};

export default useModal;
