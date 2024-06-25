import {forwardRef} from "react";

const Modal = forwardRef(function Modal({children, showModal, isBlocked, toggleModal}, ref) {
  const handleClick = (e) => {
    if (showModal && e.target === ref.current && !isBlocked) {
      toggleModal();
    }
  };

  return (
    <dialog
      ref={ref}
      onClick={handleClick}
      className='dialog-backdrop overflow-y-auto border border--500 relative transform rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-lg'>
      <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>{children}</div>

      {!isBlocked && (
        <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
          <button
            type='button'
            className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'>
            Cancel
          </button>
        </div>
      )}
    </dialog>
  );
});
export default Modal;
