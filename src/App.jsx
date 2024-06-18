import Modal from "@/ui/modal"
import Create from "@/ui/forms/create"
import Join from "@/ui/forms/join"
import useModal from "@/hooks/useModal"

function App() {
  const modal = useModal();

  return (
    <>
   <Modal {...modal}>
      <Create/>
    </Modal>
    <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={modal.toggleModal}>Create match</button>
    <button className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={modal.toggleModal}>Join match</button>
    <Modal {...modal}>
      <Join/>
    </Modal>
    </>

  )
}

export default App
