import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthModal from "./components/AuthModal"
import useGeneralStore from "./stores/generalStore"
import EditProfileOverlay from './components/EditProfileOverlay';

function App() {
  const isLoginOpen = useGeneralStore((state) => state.isLoginOpen)
  const isEditProfileOpen = useGeneralStore((state) => state.isEditProfileOpen)

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {isLoginOpen && <AuthModal />}
      {isEditProfileOpen && <EditProfileOverlay />}

    </div>
  )
}

export default App
