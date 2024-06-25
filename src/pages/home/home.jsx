import Modal from "@/ui/modal";
import Create from "@/ui/forms/create";
import Join from "@/ui/forms/join";
import useModal from "@/hooks/useModal";

const Home = () => {
  const create = useModal();
  const join = useModal();

  return (
    <div className='w-screen min-h-screen flex flex-col gap-20 justify-center items-center bg-gray-700'>
      <img className='mx-auto w-60' src='/logo.svg.png' alt='Uno logo' />
      <div className='flex gap-10'>
        <button
          className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          onClick={create.toggleModal}>
          Create match
        </button>
        <button
          className='flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          onClick={join.toggleModal}>
          Join match
        </button>
      </div>

      <Modal {...create}>
        <Create ref={create.ref} />
      </Modal>
      <Modal {...join}>
        <Join ref={join.ref} />
      </Modal>
    </div>
  );
};
export default Home;
